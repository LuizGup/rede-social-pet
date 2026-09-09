const prisma = require('../prisma');

// quem um usuário segue (para o front marcar os botões "Seguindo")
const getFollowingByUserModel = async (fk_follower_id) => {
    return prisma.follows.findMany({
        where: {
            fk_follower_id: fk_follower_id
        },
        select: {
            follow_id: true,
            fk_followed_id: true
        }
    });
};

const getFollowByIdModel = async (follow_id) => {
    return prisma.follows.findUnique({
        where: {
            follow_id: follow_id
        }
    });
};

// corresponde ao create
const addFollowModel = async (fk_follower_id, fk_followed_id) => {
    return prisma.follows.create({
        data: {
            fk_follower_id: fk_follower_id,
            fk_followed_id: fk_followed_id
        }
    });
};

// corresponde ao delete
const removeFollowModel = async (follow_id) => {
    const followExist = await getFollowByIdModel(follow_id);

    if (!followExist) {
        throw new Error("Relação de seguir não encontrada.");
    }

    return prisma.follows.delete({
        where: {
            follow_id: follow_id
        }
    });
};

module.exports = {
    getFollowingByUserModel,
    getFollowByIdModel,
    addFollowModel,
    removeFollowModel
};
