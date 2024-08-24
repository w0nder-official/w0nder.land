import { NextApiRequest, NextApiResponse } from 'next';
import { WebClient } from '@slack/web-api';
import { Configure } from '@/constants/configure';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).end();
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const web = new WebClient(Configure.SlackAccessToken);

  await web.chat.postMessage({
    channel: Configure.SlackChannelIdBinaryBookClub,
    text: req.body.email ?? '',
  });

  res.status(200).json({});
};
