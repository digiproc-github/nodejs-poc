import { type Static, Type } from '@sinclair/typebox';
import { GenericEventSchema } from 'src/event/event-bus.js';
import { SupplierDtoSchema } from '../dtos/supplier.dto.js';

export enum SupplierEventName {
  CREATED = 'supplier/created'
}

export const SupplierCreatedEventSchema = Type.Object({
  ...GenericEventSchema.properties,
  name: Type.Literal(SupplierEventName.CREATED),
  data: SupplierDtoSchema
});

export type SupplierCreatedEvent = Static<typeof SupplierCreatedEventSchema>;
