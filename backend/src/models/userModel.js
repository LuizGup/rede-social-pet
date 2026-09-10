const prisma = require('../prisma');
const bcrypt = require("bcryptjs"); 


const getAllUsersModel = async () => {
    return prisma.users.findMany({
        orderBy: {
            user_id: 'asc'
        }
    })
}

//traz todas as infomações do usuário(incluindo a senha)
const getUserByIdModel = async (user_id) => {
    return prisma.users.findUnique({
        where: {
            user_id: user_id
        }
    })
}

//traz todas as infomações do usuário (exceto a senha)
const getUserProfileModel = async (user_id) => {
    return prisma.users.findUnique({
        where: {
            user_id: user_id
        },
        select: {
            user_id: true,
            user_name: true,
            user_email: true,
            user_registration_date: true,
            user_photo: true,
            user_bio: true,
            user_contact: true
        }
    })
}

//para a função de login
const getUserByEmailModel = async (user_email) => {
    return prisma.users.findUnique({
        where: {
            user_email: user_email
        }
    })
}


const createUserModel = async (user_name, user_email, user_password) => {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    return prisma.users.create({
        data: {
            user_name: user_name,
            user_email: user_email,
            user_password: hashedPassword
        }
    })
}


const updateUserModel = async (user_id, dataToUpdate) => { // 1. Recebe o ID e um objeto com os dados
    const userExist = await getUserByIdModel(user_id);

    if (!userExist) {
        throw new Error("Usuário não encontrado");
    }

    if (dataToUpdate.user_password) {
        dataToUpdate.user_password = await bcrypt.hash(dataToUpdate.user_password, 10);
    }

    return prisma.users.update({
        where: {
            user_id: user_id
        },
        data: dataToUpdate 
    });
};


const deleteUserModel = async (user_id) => {
    const userExist = await getUserByIdModel(user_id);

    if (!userExist) {
        throw new Error("Usuário não encontrado");
    }

    return prisma.users.delete({
        where: {
            user_id: user_id
        }
    })
}


module.exports = {
    getAllUsersModel,
    getUserByIdModel,
    getUserProfileModel,
    getUserByEmailModel,
    createUserModel,
    updateUserModel,
    deleteUserModel
}
