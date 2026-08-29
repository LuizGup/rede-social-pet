const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    getCommentsByPostHandler,
    addCommentHandler,
    removeCommentHandler
} = require('../controllers/commentController');


router.get('/api/post/:fk_post_id/comments', getCommentsByPostHandler);

router.post('/api/comment', authMiddleware, addCommentHandler);
router.delete('/api/comment/:comment_id', authMiddleware, removeCommentHandler);


module.exports = router;
