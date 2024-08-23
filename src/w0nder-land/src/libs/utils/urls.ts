export const getPostUrl = (uuid: string, title: string) => `/posts/${uuid}-${encodeURIComponent(title)}`;
