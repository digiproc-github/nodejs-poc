import { type Static, Type } from '@sinclair/typebox';
import { CurrencyCodeLowercase } from 'src/common/enum/currency-code.enum.js';
import { DateSchema, StringSchema } from 'src/common/schemas.js';

export const CustomerDtoSchema = Type.Object({
  id: StringSchema,
  name: Type.Union([StringSchema, Type.Null()]),
  date: DateSchema,
  businessRegistrationNumber: Type.Union([StringSchema, Type.Null()]),
  currency: Type.Union([Type.Enum(CurrencyCodeLowercase), Type.Null()]),
  token: Type.Union([StringSchema, Type.Null()])
});

export type CustomerDto = Static<typeof CustomerDtoSchema>;
