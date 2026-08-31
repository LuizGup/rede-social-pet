import api from "./api";



const search = async (term) => {
  try {
    const response = await api.get(`/api/search`, { params: { q: term } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar.", error);
    throw error;
  }
};



export default {
  search
};
