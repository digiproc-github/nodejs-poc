import { type Static, Type } from '@sinclair/typebox';
import { IdInputSchema } from '../schemas.js';

export const IdParamsDtoSchema = Type.Object({
  id: IdInputSchema
});

export type IdParamsDto = Static<typeof IdParamsDtoSchema>;
