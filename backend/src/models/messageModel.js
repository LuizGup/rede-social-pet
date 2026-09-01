const prisma = require('../prisma');

const partnerSelect = {
    select: {
        user_id: true,
        user_name: true,
        user_photo: true
    }
};

// corresponde ao create
const createMessageModel = async (fk_sender_id, fk_receiver_id, message_content) => {
    return prisma.Messages.create({
        data: {
            fk_sender_id,
            fk_receiver_id,
            message_content
        }
    });
};

// conversa entre dois usuários (ordem cronológica)
const getConversationModel = async (userA, userB) => {
    return prisma.Messages.findMany({
        where: {
            OR: [
                { fk_sender_id: userA, fk_receiver_id: userB },
                { fk_sender_id: userB, fk_receiver_id: userA }
            ]
        },
        orderBy: {
            created_at: 'asc'
        }
    });
};

// marca como lidas as mensagens que o outro usuário enviou para mim
const markConversationReadModel = async (myId, otherId) => {
    return prisma.Messages.updateMany({
        where: {
            fk_sender_id: otherId,
            fk_receiver_id: myId,
            message_read: false
        },
        data: {
            message_read: true
        }
    });
};

// lista de conversas: para cada parceiro, a última mensagem trocada
const getConversationsModel = async (userId) => {
    const messages = await prisma.Messages.findMany({
        where: {
            OR: [
                { fk_sender_id: userId },
                { fk_receiver_id: userId }
            ]
        },
        orderBy: {
            created_at: 'desc'
        },
        include: {
            sender: partnerSelect,
            receiver: partnerSelect
        }
    });

    // reduz para uma entrada por parceiro (mantém a mensagem mais recente)
    const byPartner = new Map();
    for (const msg of messages) {
        const partner = msg.fk_sender_id === userId ? msg.receiver : msg.sender;
        if (!byPartner.has(partner.user_id)) {
            byPartner.set(partner.user_id, {
                partner,
                last_message: msg.message_content,
                last_date: msg.created_at
            });
        }
    }

    return Array.from(byPartner.values());
};

module.exports = {
    createMessageModel,
    getConversationModel,
    markConversationReadModel,
    getConversationsModel
};
