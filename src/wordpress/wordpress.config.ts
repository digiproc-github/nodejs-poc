import { type ExtendOptions } from 'got';

export const gotConfig: ExtendOptions = {
  prefixUrl: process.env.WORDPRESS_PREFIX_URL ?? 'http://localhost:3001'
};
