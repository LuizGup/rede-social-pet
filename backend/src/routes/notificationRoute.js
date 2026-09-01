const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    getNotificationsHandler,
    getUnreadCountHandler,
    markAllReadHandler
} = require('../controllers/notificationController');


router.get('/api/notifications', authMiddleware, getNotificationsHandler);
router.get('/api/notifications/unread-count', authMiddleware, getUnreadCountHandler);
router.put('/api/notifications/read', authMiddleware, markAllReadHandler);


module.exports = router;
