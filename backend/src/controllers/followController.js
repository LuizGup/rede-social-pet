const {
    getFollowingByUserModel,
    getFollowByIdModel,
    addFollowModel,
    removeFollowModel
} = require('../models/followModel');


// GET /api/user/:fk_follower_id/following
const getFollowingByUserHandler = async (req, res) => {
    const fk_follower_id = parseInt(req.params.fk_follower_id);

    try {
        const following = await getFollowingByUserModel(fk_follower_id);
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar quem o usuário segue.' });
    }
};


// POST /api/follow  (protegido) -> segue com o seguidor vindo do token
const addFollowHandler = async (req, res) => {
    const { fk_followed_id } = req.body;
    const fk_follower_id = req.user.user_id;

    if (!fk_followed_id) {
        return res.status(400).json({ error: 'O id do usuário a seguir é obrigatório.' });
    }

    if (parseInt(fk_followed_id) === fk_follower_id) {
        return res.status(400).json({ error: 'Você não pode seguir a si mesmo.' });
    }

    try {
        const newFollow = await addFollowModel(fk_follower_id, parseInt(fk_followed_id));
        res.status(201).json(newFollow);
    } catch (error) {
        // violação de unique (já segue esse usuário)
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Você já segue este usuário.' });
        }
        res.status(500).json({ error: error.message });
    }
};


// DELETE /api/follow/:follow_id  (protegido) -> só o próprio seguidor pode deixar de seguir
const removeFollowHandler = async (req, res) => {
    const follow_id = parseInt(req.params.follow_id);

    try {
        const follow = await getFollowByIdModel(follow_id);
        if (!follow) {
            return res.status(404).json({ error: 'Relação de seguir não encontrada.' });
        }

        if (follow.fk_follower_id !== req.user.user_id) {
            return res.status(403).json({ error: 'Você só pode deixar de seguir por conta própria.' });
        }

        await removeFollowModel(follow_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deixar de seguir.' });
    }
};


module.exports = {
    getFollowingByUserHandler,
    addFollowHandler,
    removeFollowHandler
};
