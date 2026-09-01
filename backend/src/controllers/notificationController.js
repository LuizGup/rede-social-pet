const {
    getNotificationsByUserModel,
    getUnreadCountModel,
    markAllReadModel
} = require('../models/notificationModel');


// GET /api/notifications  (protegido)
const getNotificationsHandler = async (req, res) => {
    try {
        const notifications = await getNotificationsByUserModel(req.user.user_id);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notificações.' });
    }
};


// GET /api/notifications/unread-count  (protegido)
const getUnreadCountHandler = async (req, res) => {
    try {
        const count = await getUnreadCountModel(req.user.user_id);
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar contagem de notificações.' });
    }
};


// PUT /api/notifications/read  (protegido) -> marca todas como lidas
const markAllReadHandler = async (req, res) => {
    try {
        await markAllReadModel(req.user.user_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao marcar notificações como lidas.' });
    }
};


module.exports = {
    getNotificationsHandler,
    getUnreadCountHandler,
    markAllReadHandler
};
