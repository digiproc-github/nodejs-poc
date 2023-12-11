import { describe, it, expect, vi, type Mock, beforeEach, afterEach } from 'vitest';
import { getLoggerMock, getReplyMock, getRequestMock } from 'test/utils.js';
import { type CustomerService } from '../services/customer.service.js';
import { type CustomerDto } from '../dtos/customer.dto.js';
import { CustomerController } from './customer.controller.js';
import { type GetByIdRoute } from './customer.controller.js';

const service = {
  getById: vi.fn()
} as any as CustomerService;

const controller = new CustomerController(service, getLoggerMock());

const dto = {} as any as CustomerDto;

describe('CustomerController', () => {
  beforeEach(() => {
    (service.getById as Mock).mockResolvedValue(dto);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should return the service response', async () => {
      const req = getRequestMock<GetByIdRoute>({
        params: { id: 'something' }
      });
      const reply = getReplyMock<GetByIdRoute>();

      await controller.getById(req, reply);

      expect(service.getById).toHaveBeenCalledWith(req.params.id);
      expect(reply.send).toHaveBeenCalledWith(dto);
    });
  });
});
