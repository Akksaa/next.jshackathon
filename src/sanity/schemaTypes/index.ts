import { type SchemaTypeDefinition } from 'sanity'
import { foodProductSchema } from './foodProductSchema'
import { BlogSchema } from './BlogSchema'
import { OrderSchema } from './OrderSchema'
import { ShipmentInfo } from './ShipmentInfoSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foodProductSchema, BlogSchema, OrderSchema, ShipmentInfo],
}
