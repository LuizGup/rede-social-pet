import api from "./api";



const getConversations = async () => {
  try {
    const response = await api.get('/api/conversations');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar conversas.", error);
    throw error;
  }
};



const getConversation = async (other_user_id) => {
  try {
    const response = await api.get(`/api/messages/${other_user_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a conversa.", error);
    throw error;
  }
};



const sendMessage = async (payload) => {
  try {
    const response = await api.post('/api/message', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem.", error);
    throw error;
  }
};



export default {
  getConversations,
  getConversation,
  sendMessage
};
