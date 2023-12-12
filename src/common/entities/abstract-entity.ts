export interface AbstractEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type Creatable<T extends AbstractEntity> = Omit<T, keyof AbstractEntity>;

export type Updatable<T extends AbstractEntity> = Creatable<T> & Pick<T, 'id'>;
