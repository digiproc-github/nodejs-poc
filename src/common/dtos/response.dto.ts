import { Type, type Static } from '@sinclair/typebox';
import { IdSchema } from '../schemas.js';

export enum ResponseType {
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
}

export const BaseResponseDtoSchema = Type.Object({
  type: Type.Enum(ResponseType),
  id: IdSchema
});

export type BaseResponseDto = Static<typeof BaseResponseDtoSchema>;
