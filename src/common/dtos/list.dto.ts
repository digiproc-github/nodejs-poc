import { type TSchema, Type } from '@sinclair/typebox';

export function getListDtoSchemaFor<T extends TSchema>(item: T): TSchema {
  return Type.Object({
    items: Type.Array(item)
  });
}

export interface ListDto<T> {
  items: T[]
}
