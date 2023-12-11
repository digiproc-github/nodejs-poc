import { describe, it, expect, vi } from 'vitest';
import { type FastifyInstance } from 'fastify';
import { getLoggerMock } from 'test/utils.js';
import serverConfig from './server.config.js';
import { Server } from './server.js';
import { type Controller } from './controller.js';

const fastify = {
  listen: vi.fn(),
  route: vi.fn()
} as any as FastifyInstance;

const controllers = [{
  mount: vi.fn()
}, {
  mount: vi.fn()
}] as any as Controller[];

const server = new Server(fastify, controllers, getLoggerMock());

describe('Server', () => {
  describe('start', () => {
    it('should start listen the provided fastify instance, with the given controllers routes and config', async () => {
      await server.start();

      for (const controller of controllers) {
        expect(controller.mount).toHaveBeenCalledWith(fastify);
      }

      expect(fastify.listen).toHaveBeenCalledWith(serverConfig);
    });
  });
});
