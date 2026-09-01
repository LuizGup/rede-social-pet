const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    getConversationsHandler,
    getConversationHandler,
    sendMessageHandler
} = require('../controllers/messageController');


router.get('/api/conversations', authMiddleware, getConversationsHandler);
router.get('/api/messages/:other_user_id', authMiddleware, getConversationHandler);
router.post('/api/message', authMiddleware, sendMessageHandler);


module.exports = router;
