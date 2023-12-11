import { type Static, Type } from '@sinclair/typebox';
import { BaseResponseDtoSchema } from 'src/common/dtos/response.dto.js';
import { CurrencyCodeSchema, DateSchema, StringSchema, UriSchema } from 'src/common/schemas.js';

export const CustomerDtoSchema = Type.Object({
  ...BaseResponseDtoSchema.properties,
  attributes: Type.Object({
    fullName: StringSchema,
    businessRegistration: Type.Optional(StringSchema),
    currency: CurrencyCodeSchema,
    createdAt: DateSchema
  }),
  links: Type.Object({
    registration: UriSchema
  })
});

export type CustomerDto = Static<typeof CustomerDtoSchema>;
