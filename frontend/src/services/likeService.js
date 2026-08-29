import api from "./api";



const getLikesByUser = async (user_id) => {
  try {
    const response = await api.get(`/api/user/${user_id}/likes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as curtidas do usuário.", error);
    throw error;
  }
};



const addLike = async (payload) => {
  try {
    const response = await api.post('/api/like', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao curtir o post.", error);
    throw error;
  }
};



const removeLike = async (like_id) => {
  try {
    const response = await api.delete(`/api/like/${like_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover a curtida.", error);
    throw error;
  }
};



export default {
  getLikesByUser,
  addLike,
  removeLike
};
