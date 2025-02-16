import { ShareService } from '@/libs/Share';
import { copyText } from '@/libs/utils/common';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useMemo, useState } from 'react';

export const Share = ({ title, text, url }: { title: string; text: string; url: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleQRClose = useCallback(() => {
    setShowQR(false);
  }, []);

  const handleQROpen = useCallback(() => {
    setShowQR(true);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setShowQR(false);
  }, []);

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
        title: '트위터에서 공유',
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
        title: 'Threads에서 공유',
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
        action: () => handleQROpen(),
      },
    ],
    [handleClose, handleQROpen, url, title, text],
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpen}
        className="p-2 w-full flex justify-center items-center border rounded-lg
        border-gray-300
        active:bg-gray-100 active:border-gray-500 active:scale-[0.99]
        transition-all duration-150">
        <span>
          <i className="ri-share-line" />
          &nbsp;&nbsp;공유하기
        </span>
      </button>

      {isOpen && (
        <>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="fixed inset-0 bg-black/40 z-[40]" onClick={handleClose} />

          <div className="fixed bottom-0 left-0 right-0 pb-2 z-[41] flex justify-center">
            <div className="w-full max-w-screen-md animate-slide-up rounded-2xl bg-white">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">공유하기</h3>
                  <button type="button" onClick={handleClose} className="p-2">
                    <span>
                      <i className="ri-close-line" />
                      &nbsp;&nbsp;닫기
                    </span>
                  </button>
                </div>
                <div className="mt-6">
                  {/* Native Share Button */}
                  {typeof navigator.share === 'function' && (
                    <button
                      type="button"
                      onClick={handleShare}
                      className="w-full py-3 flex items-center space-x-3 hover:bg-gray-50 rounded-lg">
                      <span>
                        <i className="ri-share-line" />
                      </span>
                      <span className="font-medium">다른 앱으로 공유하기</span>
                    </button>
                  )}

                  {/* Share Options */}
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-500 mb-2">공유 옵션</div>
                    <div className="space-y-1">
                      {shareOptions.map(option => (
                        <button
                          type="button"
                          key={`${option.title}`}
                          onClick={option.action}
                          className="w-full py-3 flex items-center space-x-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">{option.icon}</div>
                          <span className="font-medium">{option.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showQR && (
        <>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="fixed inset-0 bg-black/40 z-[60]" onClick={handleQRClose} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[61]">
            <div className="bg-white rounded-2xl p-6 w-[320px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">QR 코드</h3>
                <button type="button" onClick={handleQRClose} className="p-2">
                  <span>
                    <i className="ri-close-line" />
                    &nbsp;&nbsp;닫기
                  </span>
                </button>
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
