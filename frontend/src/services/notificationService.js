import api from "./api";



const getNotifications = async () => {
  try {
    const response = await api.get('/api/notifications');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar notificações.", error);
    throw error;
  }
};



const getUnreadCount = async () => {
  try {
    const response = await api.get('/api/notifications/unread-count');
    return response.data.count;
  } catch (error) {
    console.error("Erro ao buscar contagem de notificações.", error);
    throw error;
  }
};



const markAllRead = async () => {
  try {
    const response = await api.put('/api/notifications/read');
    return response.data;
  } catch (error) {
    console.error("Erro ao marcar notificações como lidas.", error);
    throw error;
  }
};



export default {
  getNotifications,
  getUnreadCount,
  markAllRead
};
