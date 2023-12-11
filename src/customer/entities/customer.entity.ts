import { type CurrencyCode } from 'src/common/enum/currency-code.enum.js';

export interface CustomerEntity {
  id: string
  fullName: string
  currency: CurrencyCode
  businessRegistration?: string
  createdAt: Date
}
