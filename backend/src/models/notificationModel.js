const prisma = require('../prisma');

// cria uma notificação (não notifica o próprio usuário sobre a própria ação)
const createNotificationModel = async ({ notification_type, fk_recipient_id, fk_actor_id, fk_post_id = null }) => {
    if (fk_recipient_id === fk_actor_id) {
        return null;
    }

    return prisma.Notifications.create({
        data: {
            notification_type,
            fk_recipient_id,
            fk_actor_id,
            fk_post_id
        }
    });
};

// notificações recebidas por um usuário (mais novas primeiro), com dados do autor
const getNotificationsByUserModel = async (fk_recipient_id) => {
    return prisma.Notifications.findMany({
        where: {
            fk_recipient_id: fk_recipient_id
        },
        orderBy: {
            created_at: 'desc'
        },
        take: 50,
        include: {
            actor: {
                select: {
                    user_id: true,
                    user_name: true,
                    user_photo: true
                }
            }
        }
    });
};

const getUnreadCountModel = async (fk_recipient_id) => {
    return prisma.Notifications.count({
        where: {
            fk_recipient_id: fk_recipient_id,
            notification_read: false
        }
    });
};

const markAllReadModel = async (fk_recipient_id) => {
    return prisma.Notifications.updateMany({
        where: {
            fk_recipient_id: fk_recipient_id,
            notification_read: false
        },
        data: {
            notification_read: true
        }
    });
};

module.exports = {
    createNotificationModel,
    getNotificationsByUserModel,
    getUnreadCountModel,
    markAllReadModel
};
