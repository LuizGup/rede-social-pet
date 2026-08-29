const {
    getLikesByUserModel,
    getLikeByIdModel,
    addLikeModel,
    removeLikeModel
} = require('../models/likeModel');


// GET /api/user/:fk_user_id/likes
const getLikesByUserHandler = async (req, res) => {
    const fk_user_id = parseInt(req.params.fk_user_id);

    try {
        const likes = await getLikesByUserModel(fk_user_id);
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as curtidas do usuário.' });
    }
};


// POST /api/like  (protegido) -> curtir com o usuário vindo do token
const addLikeHandler = async (req, res) => {
    const { fk_post_id } = req.body;
    const fk_user_id = req.user.user_id;

    if (!fk_post_id) {
        return res.status(400).json({ error: 'O id do post é obrigatório.' });
    }

    try {
        const newLike = await addLikeModel(parseInt(fk_post_id), fk_user_id);
        res.status(201).json(newLike);
    } catch (error) {
        // violação de unique (usuário já curtiu esse post)
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Você já curtiu este post.' });
        }
        res.status(500).json({ error: error.message });
    }
};


// DELETE /api/like/:like_id  (protegido) -> só quem curtiu pode descurtir
const removeLikeHandler = async (req, res) => {
    const like_id = parseInt(req.params.like_id);

    try {
        const like = await getLikeByIdModel(like_id);
        if (!like) {
            return res.status(404).json({ error: 'Curtida não encontrada.' });
        }

        if (like.fk_user_id !== req.user.user_id) {
            return res.status(403).json({ error: 'Você só pode remover as suas próprias curtidas.' });
        }

        await removeLikeModel(like_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover a curtida.' });
    }
};


module.exports = {
    getLikesByUserHandler,
    addLikeHandler,
    removeLikeHandler
};
