import { type Server } from 'http';
import { type FastifyBaseLogger, type FastifyHttpOptions } from 'fastify';
import hyperid from 'hyperid';
import loggerConfig from 'src/log/logger.config.js';

const envToTrustProxy = {
  development: false,
  production: true,
  test: false
};

const coercedEnv = process.env.NODE_ENV ?? 'development';

const fastifyConfig: FastifyHttpOptions<Server, FastifyBaseLogger> = {
  logger: loggerConfig,
  trustProxy: envToTrustProxy[coercedEnv],
  genReqId: hyperid({ urlSafe: true }),
  disableRequestLogging: true
};

export default fastifyConfig;
