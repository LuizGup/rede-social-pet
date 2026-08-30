const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    getFeedHandler,
    getFollowingFeedHandler,
    getPostsByUserHandler,
    getPostByIdHandler,
    createPostHandler,
    deletePostHandler
} = require('../controllers/postController');


// leitura (pública)
router.get('/api/feed', getFeedHandler);
router.get('/api/feed/following', authMiddleware, getFollowingFeedHandler);
router.get('/api/user/:fk_author_id/posts', getPostsByUserHandler);
router.get('/api/post/:post_id', getPostByIdHandler);

// escrita (exige login)
router.post('/api/post', authMiddleware, createPostHandler);
router.delete('/api/post/:post_id', authMiddleware, deletePostHandler);


module.exports = router;
