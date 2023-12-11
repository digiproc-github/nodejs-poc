import { type SupplierDto } from '../dtos/supplier.dto.js';

export class SupplierMapper {
  toDto(entity: Supplier): SupplierDto {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address,
      phone: entity.phone,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}
