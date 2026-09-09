const prisma = require('../prisma');

// busca usuários por nome (case-insensitive)
const searchUsersModel = async (term) => {
    return prisma.users.findMany({
        where: {
            user_name: {
                contains: term,
                mode: 'insensitive'
            }
        },
        select: {
            user_id: true,
            user_name: true,
            user_photo: true,
            user_bio: true
        },
        take: 20
    });
};

// busca posts por conteúdo/hashtag (case-insensitive)
const searchPostsModel = async (term) => {
    return prisma.posts.findMany({
        where: {
            post_content: {
                contains: term,
                mode: 'insensitive'
            }
        },
        orderBy: {
            post_created_at: 'desc'
        },
        include: {
            author: {
                select: {
                    user_id: true,
                    user_name: true,
                    user_photo: true
                }
            },
            _count: {
                select: { likes: true, comments: true }
            }
        },
        take: 20
    });
};

module.exports = {
    searchUsersModel,
    searchPostsModel
};
