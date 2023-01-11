import { Access } from 'payload/config';

export const readAccess: Access = ({ req: { user } }) => {
    return (user?.type === 'admin') || {
        id: {
            equals: user.id,
        },
    };
};

export const createAccess: Access = ({ data, req: { user } }) => {
    return user?.type === 'admin' || data?.type === 'user'
};

export const updateAccess: Access = ({ id, req: { user } }) => {
    return user?.type === 'admin' || user.id === id
};

export const deleteAccess: Access = ({ id, req: { user } }) => {
    return user?.type === 'admin' || user.id === id
};
