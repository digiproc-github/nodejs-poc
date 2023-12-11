import { Type } from '@sinclair/typebox';

/**
 * @description input schemas are common schemas that are being used to validate input data
 */

export const StringInputSchema = Type.String({ maxLength: 512 });

export const NotEmptyStringInputSchema = Type.String({
  ...StringInputSchema,
  minLength: 1
});

export const DateInputSchema = Type.String({ format: 'date-time' });

export const EmailInputSchema = Type.String({
  ...StringInputSchema,
  format: 'email'
});

/** @todo enforce complexity and increase min length */
export const PasswordInputSchema = Type.String({
  ...StringInputSchema,
  minLength: 6
});

/** @todo enforce timezone is into the supported list by either Intl or the library we use */
export const TimezoneInputSchema = Type.String({
  ...NotEmptyStringInputSchema
});

export const UriInputSchema = Type.String({ format: 'uri' });

/** @todo make our IDs consistent using cuid2, then validate the pattern */
export const IdInputSchema = NotEmptyStringInputSchema;

export const PositiveIntegerSchema = Type.Number({ minimum: 0, multipleOf: 1 });

/**
 * @description output schemas are used to validate our APIs output, and are less strict
 */
export const StringSchema = Type.String();

export const IdSchema = StringSchema;

export const EmailSchema = Type.String({ format: 'email' });

export const DateSchema = Type.String({ format: 'date-time' });

export const UriSchema = Type.String({ format: 'uri' });
