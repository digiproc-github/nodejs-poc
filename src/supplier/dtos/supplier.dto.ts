import { type Static, Type } from '@sinclair/typebox';
import { BaseResponseDtoSchema, ResponseType } from 'src/common/dtos/response.dto.js';
import { DateSchema, NotEmptyStringInputSchema, StringSchema } from 'src/common/schemas.js';

export const SupplierDtoSchema = Type.Object({
  ...BaseResponseDtoSchema.properties,
  type: Type.Literal(ResponseType.SUPPLIER),
  attributes: Type.Object({
    name: StringSchema,
    createdAt: DateSchema,
    updatedAt: DateSchema
  })
});

export type SupplierDto = Static<typeof SupplierDtoSchema>;

export const CreateSupplierDtoSchema = Type.Object({
  attributes: Type.Object({
    name: NotEmptyStringInputSchema
  })
});

export type CreateSupplierDto = Static<typeof CreateSupplierDtoSchema>;
