import { type Static, Type } from '@sinclair/typebox';
import { BaseResponseDtoSchema, ResponseType } from 'src/common/dtos/response.dto.js';

export const SupplierDtoSchema = Type.Object({
  ...BaseResponseDtoSchema.properties,
  type: Type.Literal(ResponseType.SUPPLIER),
  attributes: Type.Object({

  })
});

export type SupplierDto = Static<typeof SupplierDtoSchema>;
