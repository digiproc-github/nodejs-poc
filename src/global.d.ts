import { type Controller } from './server/controller.ts';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production' | undefined

      // log
      LOG_LEVEL: 'debug' | 'info' | undefined

      // http
      PORT: string | undefined

      // wordpress
      WORDPRESS_PREFIX_URL: string | undefined
    }
  }

  interface Module {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Services?: Record<string, InstanceType<any>>
    Controllers?: Controller[]
  }
}

export {};
