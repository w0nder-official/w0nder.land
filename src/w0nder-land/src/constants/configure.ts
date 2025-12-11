import * as process from 'process';
import { Environment } from '@/constants/common';

export class Configure {
  static readonly Environment = process.env.ENVIRONMENT || Environment.Production;

  static readonly ServiceUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'https://w0nder.land';

  static readonly GaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-X5RKHMNZ1P';

  static readonly SlackAccessToken = process.env.SLACK_ACCESS_TOKEN || '';

  static readonly SlackChannelIdBinaryBookClub = process.env.SLACK_CHANNEL_ID_BINARY_BOOK_CLUB || '';
}
