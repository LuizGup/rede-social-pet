const {
    createMessageModel,
    getConversationModel,
    markConversationReadModel,
    getConversationsModel
} = require('../models/messageModel');


// GET /api/conversations  (protegido) -> lista de conversas do usuário
const getConversationsHandler = async (req, res) => {
    try {
        const conversations = await getConversationsModel(req.user.user_id);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conversas.' });
    }
};


// GET /api/messages/:other_user_id  (protegido) -> conversa com um usuário
const getConversationHandler = async (req, res) => {
    const otherId = parseInt(req.params.other_user_id);
    const myId = req.user.user_id;

    try {
        const messages = await getConversationModel(myId, otherId);
        // ao abrir, marca como lidas as mensagens recebidas
        await markConversationReadModel(myId, otherId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a conversa.' });
    }
};


// POST /api/message  (protegido) -> envia mensagem
const sendMessageHandler = async (req, res) => {
    const { fk_receiver_id, message_content } = req.body;
    const fk_sender_id = req.user.user_id;

    if (!fk_receiver_id) {
        return res.status(400).json({ error: 'O destinatário é obrigatório.' });
    }
    if (!message_content || !message_content.trim()) {
        return res.status(400).json({ error: 'A mensagem não pode ser vazia.' });
    }
    if (parseInt(fk_receiver_id) === fk_sender_id) {
        return res.status(400).json({ error: 'Você não pode enviar mensagem para si mesmo.' });
    }

    try {
        const newMessage = await createMessageModel(
            fk_sender_id,
            parseInt(fk_receiver_id),
            message_content.trim()
        );
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getConversationsHandler,
    getConversationHandler,
    sendMessageHandler
};
