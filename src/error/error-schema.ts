import { Type } from '@sinclair/typebox';

export const ErrorSchema = Type.Object({
  statusCode: Type.Number(),
  code: Type.String(),
  error: Type.String(),
  message: Type.String()
});
