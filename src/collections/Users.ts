import { CollectionConfig } from 'payload/types';
import {createAccess, deleteAccess, readAccess, updateAccess} from "../access/usersAccess";

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['email', 'name', 'type'],
    useAsTitle: 'email',
  },
  access: {
    create: readAccess,
    read: createAccess,
    update: updateAccess,
    delete: deleteAccess,
    admin: ({ req: { user } }) => user?.type === 'admin',
    unlock: ({ req: { user } }) => user?.type === 'admin',
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'user',
          label: 'User',
        },
      ],
      defaultValue: 'user',
    }
  ],
};

export default Users;
