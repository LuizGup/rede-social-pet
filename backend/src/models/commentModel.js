const prisma = require('../prisma');

// autor embutido em cada comentário
const authorSelect = {
    select: {
        user_id: true,
        user_name: true,
        user_photo: true
    }
};

// comentários de um post, do mais antigo para o mais novo
const getCommentsByPostModel = async (fk_post_id) => {
    return prisma.Comments.findMany({
        where: {
            fk_post_id: fk_post_id
        },
        orderBy: {
            comment_date: 'asc'
        },
        include: {
            user: authorSelect
        }
    });
};

const getCommentByIdModel = async (comment_id) => {
    return prisma.Comments.findUnique({
        where: {
            comment_id: comment_id
        }
    });
};

// corresponde ao create
const addCommentModel = async (fk_post_id, fk_user_id, comment_content) => {
    return prisma.Comments.create({
        data: {
            fk_post_id: fk_post_id,
            fk_user_id: fk_user_id,
            comment_content: comment_content
        },
        include: {
            user: authorSelect
        }
    });
};

// corresponde ao delete
const removeCommentModel = async (comment_id) => {
    const commentExist = await getCommentByIdModel(comment_id);

    if (!commentExist) {
        throw new Error("Comentário não encontrado.");
    }

    return prisma.Comments.delete({
        where: {
            comment_id: comment_id
        }
    });
};

module.exports = {
    getCommentsByPostModel,
    getCommentByIdModel,
    addCommentModel,
    removeCommentModel
};
