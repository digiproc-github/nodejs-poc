import { type Static, Type } from '@sinclair/typebox';

export const NoContentDtoSchema = Type.Null();

export type NoContentDto = Static<typeof NoContentDtoSchema>;
