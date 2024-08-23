import { copyText } from '@/libs/utils/common';

export enum ShareTarget {
  Share = 'Share',
  Copy = 'Copy',
}

export class ShareService {
  static async share(params: { title: string; text?: string; url?: string }) {
    if (navigator.share) {
      await navigator.share({ title: params.title, url: params.url, text: params.text });
      return ShareTarget.Share;
    }

    copyText(params.url || params.text || params.title);
    return ShareTarget.Copy;
  }
}
