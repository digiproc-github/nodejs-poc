import fastify, { type FastifyInstance } from 'fastify';
import fastifyConfig from './fastify.config.js';

export function getFastify(): FastifyInstance {
  return fastify(fastifyConfig)
    .addHook('onResponse', async (req, reply) => {
      const responseTime = reply.getResponseTime();
      req.log.info({ req, res: reply, responseTime }, 'request completed');
    });
}
