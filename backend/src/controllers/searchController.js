const {
    searchUsersModel,
    searchPostsModel
} = require('../models/searchModel');


// GET /api/search?q=termo  -> { users: [...], posts: [...] }
const searchHandler = async (req, res) => {
    const term = (req.query.q || '').trim();

    if (!term) {
        return res.status(200).json({ users: [], posts: [] });
    }

    // hashtag: "#gatos" busca por "gatos" no conteúdo dos posts
    const postTerm = term.startsWith('#') ? term.slice(1) : term;

    try {
        const [users, posts] = await Promise.all([
            searchUsersModel(term),
            searchPostsModel(postTerm)
        ]);
        res.status(200).json({ users, posts });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar a busca.' });
    }
};


module.exports = {
    searchHandler
};
