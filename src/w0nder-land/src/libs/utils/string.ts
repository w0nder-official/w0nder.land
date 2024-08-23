export const ellipsis = (text: string, length: number) =>
  text.length <= length ? text : `${text.slice(0, length - 3)}...`;
