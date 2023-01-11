import { CollectionConfig } from 'payload/types';
import {createAccess, deleteAccess, readAccess, updateAccess} from "../access/postsAccess";

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'author', 'status'],
    useAsTitle: 'title',
  },
  access: {
    create: createAccess,
    read: readAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'content',
      type: 'richText'
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      }
    }
  ],
}

export default Posts;
