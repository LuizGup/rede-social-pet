import api from "./api";



const getCommentsByPost = async (post_id) => {
  try {
    const response = await api.get(`/api/post/${post_id}/comments`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os comentários.", error);
    throw error;
  }
};



const addComment = async (payload) => {
  try {
    const response = await api.post('/api/comment', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao comentar.", error);
    throw error;
  }
};



const removeComment = async (comment_id) => {
  try {
    const response = await api.delete(`/api/comment/${comment_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao apagar o comentário.", error);
    throw error;
  }
};



export default {
  getCommentsByPost,
  addComment,
  removeComment
};
