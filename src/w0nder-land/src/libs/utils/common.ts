// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: (...params: any) => void, wait: number) => {
  let timer: NodeJS.Timeout | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...params: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, wait);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = (func: (...params: any) => void, time: number) => {
  let timer: NodeJS.Timeout | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...params: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...params);
        timer = undefined;
      }, time);
    }
  };
};

export const copyText = (text: string) => {
  try {
    const type = 'text/plain';
    const blob = new Blob([text], { type });
    const { ClipboardItem } = window;
    navigator.clipboard.write([new ClipboardItem({ [type]: blob })]);
  } catch (e) {
    copyTextByExecCommand(text);
  }
};

function copyTextByExecCommand(text: string) {
  const element = document.createElement('textarea');
  element.value = text;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  const returnValue = document.execCommand('copy');
  document.body.removeChild(element);
  if (!returnValue) {
    throw new Error('copied nothing');
  }
}

export const isServer = () => typeof window === 'undefined';
