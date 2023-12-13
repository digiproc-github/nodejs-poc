import { type Controller } from './server/controller.ts';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production' | undefined

      // log
      LOG_LEVEL: 'debug' | 'info' | undefined

      // http
      PORT: string | undefined

      // database
      POSTGRES_HOST: string | undefined
      POSTGRES_PORT: string | undefined
      POSTGRES_USERNAME: string | undefined
      POSTGRES_PASSWORD: string | undefined
      POSTGRES_DATABASE: string | undefined

      // wordpress
      WORDPRESS_PREFIX_URL: string | undefined
    }
  }

  interface Module {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    services?: Record<string, InstanceType<any>>
    controllers?: Controller[]
  }
}

export {};
