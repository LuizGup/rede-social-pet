const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    getFollowingByUserHandler,
    addFollowHandler,
    removeFollowHandler
} = require('../controllers/followController');


router.get('/api/user/:fk_follower_id/following', getFollowingByUserHandler);

router.post('/api/follow', authMiddleware, addFollowHandler);
router.delete('/api/follow/:follow_id', authMiddleware, removeFollowHandler);


module.exports = router;
