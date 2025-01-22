import { type SchemaTypeDefinition } from 'sanity'
import { foodProductSchema } from './foodProductSchema'
import { BlogSchema } from './BlogSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foodProductSchema, BlogSchema],
}
