import * as process from 'process';
import { Environment } from '@/constants/common';

export class Configure {
  static readonly Environment = process.env.ENVIRONMENT || Environment.Local;

  static readonly ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

  static readonly GaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
}