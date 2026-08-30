import api from "./api";



const getFollowing = async (user_id) => {
  try {
    const response = await api.get(`/api/user/${user_id}/following`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar quem o usuário segue.", error);
    throw error;
  }
};



const follow = async (payload) => {
  try {
    const response = await api.post('/api/follow', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao seguir usuário.", error);
    throw error;
  }
};



const unfollow = async (follow_id) => {
  try {
    const response = await api.delete(`/api/follow/${follow_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deixar de seguir.", error);
    throw error;
  }
};



export default {
  getFollowing,
  follow,
  unfollow
};
