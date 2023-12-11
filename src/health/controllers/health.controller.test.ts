import { describe, it, expect } from 'vitest';
import { getLoggerMock, getReplyMock, getRequestMock } from 'test/utils.js';
import { HealthController } from './health.controller.js';

const controller = new HealthController(getLoggerMock());

describe('HealthController', () => {
  describe('get', () => {
    it('should reply with a structured JSON', async () => {
      const req = getRequestMock();
      const reply = getReplyMock();

      await controller.get(req, reply);

      expect(reply.send).toHaveBeenCalledWith({ status: 'up' });
    });
  });
});
