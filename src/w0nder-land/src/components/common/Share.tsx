import { ShareService } from '@/libs/Share';
import { copyText } from '@/libs/utils/common';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

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
      {isOpen && (
        <>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="fixed inset-0 bg-black/40 z-[40]" onClick={handleClose} />

          <div className="fixed bottom-0 left-0 right-0 pb-2 z-[41] flex justify-center">
            <div className="w-full max-w-screen-md animate-slide-up rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFFBCC] relative overflow-hidden">
              {/* 컬러 블록 포인트 */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#FF7A5C] border-2 border-black" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#A7DBD8] border-2 border-black" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-extrabold uppercase border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    SHARE
                  </h3>
                  <Button
                    type="button"
                    onClick={handleClose}
                    size="icon"
                    className="w-10 h-10 border-2 border-black rounded-xl bg-[#FFB2EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-2 flex items-center justify-center"
                    aria-label="닫기">
                    <i className="ri-close-line text-2xl" />
                  </Button>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {/* Native Share Button */}
                  {typeof navigator.share === 'function' && (
                    <Button
                      type="button"
                      onClick={handleShare}
                      size="lg"
                      className="w-full h-14 text-lg font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#F4D738] rounded-xl flex items-center justify-center gap-2">
                      <span className="flex items-center gap-2">
                        <i className="ri-share-line text-3xl" />
                        다른 앱으로 공유하기
                      </span>
                    </Button>
                  )}

                  {/* Share Options */}
                  <div className="flex flex-col gap-3">
                    {shareOptions.map(option => {
                      let btnColor = 'bg-white text-black';
                      if (option.title.includes('트위터')) {
                        btnColor = 'bg-[#1DA1F2] text-white';
                      }
                      if (option.title.includes('Threads')) {
                        btnColor = 'bg-[#C4A1FF] text-black';
                      }
                      if (option.title.includes('복사')) {
                        btnColor = 'bg-[#FF7A5C] text-white';
                      }
                      if (option.title.includes('QR')) {
                        btnColor = 'bg-[#A7DBD8] text-black';
                      }
                      return (
                        <Button
                          type="button"
                          key={`${option.title}`}
                          onClick={option.action}
                          size="lg"
                          className={`w-full h-14 text-lg font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl flex items-center gap-2 px-4 ${btnColor}`}>
                          <span className="flex items-center gap-2">
                            <span className="flex-shrink-0">
                              <span className="text-3xl">{option.icon}</span>
                            </span>
                            {option.title}
                          </span>
                        </Button>
                      );
                    })}
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
            <div className="bg-[#FFF4E5] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-[320px] relative overflow-hidden">
              {/* 컬러 블록 포인트 */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#FF7A5C] border-2 border-black" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#A7DBD8] border-2 border-black" />
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-extrabold uppercase border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  QR 코드
                </h3>
                <Button
                  type="button"
                  onClick={handleQRClose}
                  size="icon"
                  className="w-10 h-10 border-2 border-black rounded-xl bg-[#FFB2EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-2 flex items-center justify-center"
                  aria-label="닫기">
                  <i className="ri-close-line text-2xl" />
                </Button>
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
