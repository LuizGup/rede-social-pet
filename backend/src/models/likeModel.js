const prisma = require('../prisma');

// curtidas de um usuário (para o front marcar quais posts já foram curtidos)
const getLikesByUserModel = async (fk_user_id) => {
    return prisma.likes.findMany({
        where: {
            fk_user_id: fk_user_id
        },
        select: {
            like_id: true,
            fk_post_id: true
        }
    });
};

const getLikeByIdModel = async (like_id) => {
    return prisma.likes.findUnique({
        where: {
            like_id: like_id
        }
    });
};

// corresponde ao create
const addLikeModel = async (fk_post_id, fk_user_id) => {
    return prisma.likes.create({
        data: {
            fk_post_id: fk_post_id,
            fk_user_id: fk_user_id
        }
    });
};

// corresponde ao delete
const removeLikeModel = async (like_id) => {
    const likeExist = await getLikeByIdModel(like_id);

    if (!likeExist) {
        throw new Error("Curtida não encontrada.");
    }

    return prisma.likes.delete({
        where: {
            like_id: like_id
        }
    });
};

module.exports = {
    getLikesByUserModel,
    getLikeByIdModel,
    addLikeModel,
    removeLikeModel
};
