const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    getLikesByUserHandler,
    addLikeHandler,
    removeLikeHandler
} = require('../controllers/likeController');


router.get('/api/user/:fk_user_id/likes', getLikesByUserHandler);

router.post('/api/like', authMiddleware, addLikeHandler);
router.delete('/api/like/:like_id', authMiddleware, removeLikeHandler);


module.exports = router;
