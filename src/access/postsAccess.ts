import { Access } from 'payload/config';

// Create if user is admin or data author field equals current user ID
export const createAccess: Access = ({ data, req: { user } }) => {
    return data?.author === user?.id || user?.type === 'admin'
};

// Read if post is published or user is admin or post is owned by current user
export const readAccess: Access = ({ req: { user } }) => {
    // Allow access for admin users
    if (user && user.type === 'admin') {
        return true;
    }

    // Allow access for users owning post
    if (user && user.type === 'user') {
        return {
            author: {
                equals: user.id,
            },
        }
    }

    // Allow to access all published
    return {
        status: {
            equals: 'published',
        },
    }
};

export const updateAccess: Access = async ({ id, req }) => {
    const { totalDocs } = await req.payload.find({
        collection: 'posts',
        limit: 1,
        where: {
            and: [
                {author: { equals: req.user.id }},
                {id: { equals: id }},
            ]
        },
    });

    return req.user?.type === 'admin' || totalDocs === 1
};

export const deleteAccess: Access = async ({ id, req }) => {
    const { totalDocs } = await req.payload.find({
        collection: 'posts',
        limit: 1,
        where: {
            and: [
                {author: { equals: req.user.id }},
                {id: { equals: id }},
            ]
        },
    });

    return req.user?.type === 'admin' || totalDocs === 1
};
