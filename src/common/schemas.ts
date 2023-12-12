import { Type } from '@sinclair/typebox';
import { CurrencyCode } from './enum/currency-code.enum.js';

/**
 * @description input schemas are common schemas that are being used to validate input data
 */

export const StringInputSchema = Type.String({ maxLength: 512 });

export const NotEmptyStringInputSchema = Type.String({
  ...StringInputSchema,
  minLength: 1
});

export const DateInputSchema = Type.String({ format: 'date-time' });

export const IdInputSchema = Type.String({ format: 'uuid' });

export const PositiveIntegerSchema = Type.Number({ minimum: 0, multipleOf: 1 });

/**
 * @description output schemas are used to validate our APIs output, and are less strict
 */
export const StringSchema = Type.String();

export const IdSchema = IdInputSchema;

export const EmailSchema = Type.String({ format: 'email' });

export const DateSchema = Type.String({ format: 'date-time' });

export const UriSchema = Type.String({ format: 'uri' });

export const CurrencyCodeSchema = Type.Enum(CurrencyCode);
