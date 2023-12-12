import { ResponseType } from 'src/common/dtos/response.dto.js';
import { type Creatable } from 'src/common/entities/abstract-entity.js';
import { type CreateSupplierDto, type SupplierDto } from '../dtos/supplier.dto.js';
import { type SupplierEntity } from '../entities/supplier.entity.js';

export class SupplierMapper {
  toDto(entity: SupplierEntity): SupplierDto {
    return {
      id: entity.id,
      type: ResponseType.SUPPLIER,
      attributes: {
        name: entity.name,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString()
      }
    };
  }

  toCreatableEntity(dto: CreateSupplierDto): Creatable<SupplierEntity> {
    return {
      name: dto.attributes.name
    };
  }
}
