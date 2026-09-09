const {
    getCommentsByPostModel,
    getCommentByIdModel,
    addCommentModel,
    removeCommentModel
} = require('../models/commentModel');
const { getPostByIdModel } = require('../models/postModel');
const { createNotificationModel } = require('../models/notificationModel');


// GET /api/post/:fk_post_id/comments
const getCommentsByPostHandler = async (req, res) => {
    const fk_post_id = parseInt(req.params.fk_post_id);

    try {
        const comments = await getCommentsByPostModel(fk_post_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os comentários.' });
    }
};


// POST /api/comment  -> comenta com o usuário vindo do token
const addCommentHandler = async (req, res) => {
    const { fk_post_id, comment_content } = req.body;
    const fk_user_id = req.user.user_id;

    if (!fk_post_id) {
        return res.status(400).json({ error: 'O id do post é obrigatório.' });
    }
    if (!comment_content || !comment_content.trim()) {
        return res.status(400).json({ error: 'O comentário não pode ser vazio.' });
    }

    try {
        const newComment = await addCommentModel(parseInt(fk_post_id), fk_user_id, comment_content.trim());

        // notifica o autor do post
        try {
            const post = await getPostByIdModel(parseInt(fk_post_id));
            if (post) {
                await createNotificationModel({
                    notification_type: 'COMMENT',
                    fk_recipient_id: post.fk_author_id,
                    fk_actor_id: fk_user_id,
                    fk_post_id: parseInt(fk_post_id)
                });
            }
        } catch (notifyError) {
            console.error('Falha ao criar notificação de comentário:', notifyError.message);
        }

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// DELETE /api/comment/:comment_id  -> só o autor pode apagar
const removeCommentHandler = async (req, res) => {
    const comment_id = parseInt(req.params.comment_id);

    try {
        const comment = await getCommentByIdModel(comment_id);
        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        if (comment.fk_user_id !== req.user.user_id) {
            return res.status(403).json({ error: 'Você só pode apagar os seus próprios comentários.' });
        }

        await removeCommentModel(comment_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar o comentário.' });
    }
};


module.exports = {
    getCommentsByPostHandler,
    addCommentHandler,
    removeCommentHandler
};
