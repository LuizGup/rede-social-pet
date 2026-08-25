const prisma = require('../prisma');

// dados do autor que o front precisa junto de cada post
const authorSelect = {
    select: {
        user_id: true,
        user_name: true,
        user_photo: true
    }
};

// feed: todos os posts, do mais novo para o mais antigo, com o autor embutido
const getFeedModel = async () => {
    return prisma.Posts.findMany({
        orderBy: {
            post_created_at: 'desc'
        },
        include: {
            author: authorSelect
        }
    });
};

// posts de um usuário específico (para a página de perfil)
const getPostsByUserModel = async (fk_author_id) => {
    return prisma.Posts.findMany({
        where: {
            fk_author_id: fk_author_id
        },
        orderBy: {
            post_created_at: 'desc'
        },
        include: {
            author: authorSelect
        }
    });
};

const getPostByIdModel = async (post_id) => {
    return prisma.Posts.findUnique({
        where: {
            post_id: post_id
        },
        include: {
            author: authorSelect
        }
    });
};

// corresponde ao create
const createPostModel = async (fk_author_id, post_content, post_media) => {
    return prisma.Posts.create({
        data: {
            fk_author_id: fk_author_id,
            post_content: post_content,
            post_media: post_media
        },
        include: {
            author: authorSelect
        }
    });
};

// corresponde ao delete
const deletePostModel = async (post_id) => {
    const postExist = await getPostByIdModel(post_id);

    if (!postExist) {
        throw new Error("Post não encontrado.");
    }

    return prisma.Posts.delete({
        where: {
            post_id: post_id
        }
    });
};

module.exports = {
    getFeedModel,
    getPostsByUserModel,
    getPostByIdModel,
    createPostModel,
    deletePostModel
};
