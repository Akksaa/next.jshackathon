import { defineField, defineType } from 'sanity';

export const BlogSchema = defineType({
  name: 'foodBlog',
  title: 'Food Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'description1',
        title: 'Description 1',
        type: 'string',
    }),
    defineField({
        name: 'description2',
        title: 'Description 2',
        type: 'string',
    }),
    defineField({
        name: 'quote',
        title: 'Quote',
        type: 'string',
    }),
    
    defineField({
      name: 'author',
      title: 'author name',
      type: 'string',
    }),
    defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
    }),
  ],
});
