import { EventHandler } from 'src/event/event-handler.js';
import { type SupplierCreatedEvent, SupplierCreatedEventSchema, SupplierEventName } from 'src/supplier/events/supplier.event.js';

export class SupplierEventHandler extends EventHandler {
  public listen(): void {
    this.eventBus.on<SupplierCreatedEvent>(
      SupplierEventName.CREATED,
      this.onSupplierCreated,
      SupplierCreatedEventSchema
    );
  }

  private readonly onSupplierCreated = async (event: SupplierCreatedEvent): Promise<void> => {
    this.logger.info({ event }, 'a new supplier have been created');
  };
}
