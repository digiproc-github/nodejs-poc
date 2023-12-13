import { type Logger } from 'pino';
import { LogAware } from 'src/log/log-aware.js';
import { type EventBus } from 'src/event/event-bus.js';
import { type SupplierMapper } from '../mappers/supplier.mapper.js';
import { type CreateSupplierDto, type SupplierDto } from '../dtos/supplier.dto.js';
import { type SupplierRepository } from '../repositories/supplier.repository.js';
import { type SupplierCreatedEvent, SupplierEventName } from '../events/supplier.event.js';

export class SupplierService extends LogAware {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly supplierMapper: SupplierMapper,
    private readonly eventBus: EventBus,
    logger: Logger
  ) {
    super(logger);
  }

  async getById(id: string): Promise<SupplierDto | null> {
    const supplier = await this.supplierRepository.getById(id);
    if (supplier === null) {
      return null;
    }

    return this.supplierMapper.toDto(supplier);
  }

  async create(createSupplier: CreateSupplierDto): Promise<SupplierDto> {
    const creatable = this.supplierMapper.toCreatableEntity(createSupplier);
    const supplier = await this.supplierRepository.create(creatable);

    const dto = this.supplierMapper.toDto(supplier);
    await this.eventBus.emit<SupplierCreatedEvent>({
      name: SupplierEventName.CREATED,
      refDate: new Date().toISOString(),
      data: dto
    });

    return dto;
  }
}
