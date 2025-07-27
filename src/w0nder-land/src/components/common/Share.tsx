import { ShareService } from '@/libs/Share';
import { copyText } from '@/libs/utils/common';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useMemo, useState } from 'react';
import { BrutalButton } from '@/components/ui/BrutalButton';

export const Share = ({
  title,
  text,
  url,
  isOpen,
  onClose,
}: {
  title: string;
  text: string;
  url: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [showQR, setShowQR] = useState(false);

  const handleQRClose = useCallback(() => {
    setShowQR(false);
  }, []);

  const handleQROpen = useCallback(() => {
    setShowQR(true);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setShowQR(false);
  }, [onClose]);

  const handleShare = useCallback(async () => {
    await ShareService.share({
      title,
      text,
      url,
    });
    handleClose();
  }, [handleClose, text, title, url]);

  const shareOptions = useMemo(
    () => [
      {
        icon: (
          <span>
            <i className="ri-twitter-line" />
          </span>
        ),
        title: '트위터로',
        color: 'bg-cyan-400 text-black',
        action: () => {
          const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${title}\n${text}\n${url}`,
          )}`;
          window.open(twitterShareUrl, '_blank');
          handleClose();
        },
      },
      {
        icon: (
          <span>
            <i className="ri-threads-line" />
          </span>
        ),
        title: 'Threads로',
        color: 'bg-orange-400 text-black',
        action: () => {
          const threadsShareUrl = `https://threads.net/intent/post?text=${encodeURIComponent(
            `${title}\n${text}\n${url}`,
          )}`;
          window.open(threadsShareUrl, '_blank');
          handleClose();
        },
      },
      {
        icon: (
          <span>
            <i className="ri-file-copy-line" />
          </span>
        ),
        title: '링크 복사',
        color: 'bg-lime-400 text-black',
        action: () => {
          copyText(url);
          alert('링크가 복사되었습니다.');
          handleClose();
        },
      },
      {
        icon: (
          <span>
            <i className="ri-qr-code-line" />
          </span>
        ),
        title: 'QR 코드 공유',
        color: 'bg-pink-400 text-black',
        action: () => handleQROpen(),
      },
    ],
    [handleClose, handleQROpen, url, title, text],
  );

  // 내부 컴포넌트: 공유 내용
  const ShareContent = useCallback(
    () => (
      <>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-black">SHARE THIS PAGE</h3>
          <BrutalButton onClick={handleClose} className="w-8 h-8 flex items-center justify-center hover:bg-red-400">
            X
          </BrutalButton>
        </div>
        <div className="space-y-4">
          {/* Native Share Button */}
          {typeof navigator.share === 'function' && (
            <BrutalButton onClick={handleShare} className="w-full px-4 py-2 bg-yellow-300">
              <span className="flex items-center gap-2">
                <i className="ri-share-line text-2xl mr-2" />
                다른 앱으로 공유하기
              </span>
            </BrutalButton>
          )}

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map(option => (
              <BrutalButton key={`${option.title}`} onClick={option.action} className={`px-4 py-2 ${option.color}`}>
                <span className="flex items-center gap-2">
                  <span className="flex-shrink-0">
                    <span className="text-2xl">{option.icon}</span>
                  </span>
                  <span className="text-sm">{option.title}</span>
                </span>
              </BrutalButton>
            ))}
          </div>

          <div className="border-2 border-black bg-gray-100 p-3">
            <p className="text-xs font-medium text-gray-600 mb-1">LINK:</p>
            <p className="text-sm font-black text-black break-all">{url}</p>
          </div>
        </div>
      </>
    ),
    [handleClose, handleShare, shareOptions, url],
  );

  return (
    <div className="relative">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[40]"
            onClick={handleClose}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                handleClose();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Close modal"
          />

          {/* Desktop version - Modal */}
          <div className="hidden md:block">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[41]">
              <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] max-w-md p-6">
                <ShareContent />
              </div>
            </div>
          </div>

          {/* Mobile version - Bottom Sheet */}
          <div className="md:hidden">
            <div className="fixed bottom-0 left-0 right-0 z-[41]">
              <div className="border-t-4 border-black bg-white p-6">
                <ShareContent />
              </div>
            </div>
          </div>
        </>
      )}

      {showQR && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={handleQRClose}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                handleQRClose();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Close QR modal"
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[61]">
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] p-6 w-[320px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-black">QR 코드</h3>
                <BrutalButton onClick={handleQRClose} className="w-8 h-8 flex items-center justify-center bg-red-400">
                  <span className="text-2xl font-black text-black leading-none">×</span>
                </BrutalButton>
              </div>
              <div className="flex justify-center p-4">
                <QRCodeSVG value={url} size={240} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
