import api from "./api";



const getFeed = async () => {
  try {
    const response = await api.get('/api/feed');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o feed.", error);
    throw error;
  }
};



const getFollowingFeed = async () => {
  try {
    const response = await api.get('/api/feed/following');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o feed de seguidos.", error);
    throw error;
  }
};



const getPostsByUser = async (user_id) => {
  try {
    const response = await api.get(`/api/user/${user_id}/posts`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os posts do usuário.", error);
    throw error;
  }
};



const createPost = async (payload) => {
  try {
    const response = await api.post('/api/post', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar o post.", error);
    throw error;
  }
};



const deletePost = async (post_id) => {
  try {
    const response = await api.delete(`/api/post/${post_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao apagar o post.", error);
    throw error;
  }
};



export default {
  getFeed,
  getFollowingFeed,
  getPostsByUser,
  createPost,
  deletePost
};
