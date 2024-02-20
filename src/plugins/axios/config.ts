import type { AxiosRequestConfig } from 'axios';
import dayjs from '@/plugins/dayjs';
import * as dotenv from 'dotenv';

dotenv.config();

export const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    // 'X-Timezone': dayjs().format('Z'),
    // 'X-Timezone-Name': dayjs.tz.guess(),
  },
  baseURL: 'http://localhost:3000/',
  responseType: 'json',
};
