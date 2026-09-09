const {
    getAllUsersModel,
    getUserByIdModel,
    getUserProfileModel,
    updateUserModel,
    deleteUserModel
} = require('../models/userModel');


const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsersModel();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao bsucar usuários' });
    }
}


const getUserByIdHandler = async (req, res) => {
    
    const user_id = parseInt(req.params.user_id);

    try {
        //searchingUser guarda o usuário que está sendo procurado
        const searchingUser = await getUserByIdModel(user_id);
        if (!searchingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json(searchingUser);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
}



const getUserProfileHandler = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const user = await getUserProfileModel(user_id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const updateUserHandler = async (req, res) => {
    const { user_id } = req.params;
    const { user_name, user_email, user_photo, user_bio, user_contact } = req.body;

    const dataToUpdate = {};

    if (user_name) {
        dataToUpdate.user_name = user_name;
    }
    if (user_email) {
        dataToUpdate.user_email = user_email;
    }
    if (user_photo !== undefined) {
        dataToUpdate.user_photo = user_photo;
    }
    if (user_bio !== undefined) {
        dataToUpdate.user_bio = user_bio;
    }
    if (user_contact !== undefined) {
        dataToUpdate.user_contact = user_contact;
    }

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: "Nenhum dado para atualizar foi fornecido." });
    }

    try {
        const updatedUser = await updateUserModel(parseInt(user_id), dataToUpdate);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteUserHandler = async (req, res) => {
    const user_id = parseInt(req.params.user_id);

    try {
        await deleteUserModel(user_id);
        res.status(204).send();
    } catch (error) {
        if (error.message == 'Usuário não encontrado.') {
            res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(500).json({ error: 'Erro ao adicionar usuário.' });
    }
}



module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    getUserProfileHandler,
    updateUserHandler,
    deleteUserHandler
}