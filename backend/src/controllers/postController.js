const {
    getFeedModel,
    getFollowingFeedModel,
    getPostsByUserModel,
    getPostByIdModel,
    createPostModel,
    deletePostModel
} = require('../models/postModel');


// GET /api/feed  -> lista todos os posts
const getFeedHandler = async (req, res) => {
    try {
        const feed = await getFeedModel();
        res.status(200).json(feed);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o feed.' });
    }
};


// GET /api/feed/following -> só posts de quem o usuário segue
const getFollowingFeedHandler = async (req, res) => {
    try {
        const feed = await getFollowingFeedModel(req.user.user_id);
        res.status(200).json(feed);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o feed de seguidos.' });
    }
};


// GET /api/user/:fk_author_id/posts  -> posts de um usuário
const getPostsByUserHandler = async (req, res) => {
    const fk_author_id = parseInt(req.params.fk_author_id);

    try {
        const posts = await getPostsByUserModel(fk_author_id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os posts do usuário.' });
    }
};


// GET /api/post/:post_id
const getPostByIdHandler = async (req, res) => {
    const post_id = parseInt(req.params.post_id);

    try {
        const post = await getPostByIdModel(post_id);
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o post.' });
    }
};


// POST /api/post -> cria post com o autor vindo do token
const createPostHandler = async (req, res) => {
    const { post_content, post_media } = req.body;
    const fk_author_id = req.user.user_id;

    if (!post_content || !post_content.trim()) {
        return res.status(400).json({ error: 'O conteúdo do post é obrigatório.' });
    }

    try {
        const newPost = await createPostModel(fk_author_id, post_content, post_media || null);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// DELETE /api/post/:post_id -> só o autor pode apagar
const deletePostHandler = async (req, res) => {
    const post_id = parseInt(req.params.post_id);

    try {
        const post = await getPostByIdModel(post_id);
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        if (post.fk_author_id !== req.user.user_id) {
            return res.status(403).json({ error: 'Você só pode apagar os seus próprios posts.' });
        }

        await deletePostModel(post_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar o post.' });
    }
};


module.exports = {
    getFeedHandler,
    getFollowingFeedHandler,
    getPostsByUserHandler,
    getPostByIdHandler,
    createPostHandler,
    deletePostHandler
};
