import axios from 'axios';

const TOKEN = import.meta.env.VUE_APP_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
});

export const getMostPopularMovies = async (page: number = 1) => {
  
    try{
        const response = await axiosInstance.get('/movie/popular', {
          params: {
                page
            }
        });
        
        return response.data;
        } catch (error) {
            console.error('Erro ao buscar filmes populares:', error);
            throw new Error('Erro ao buscar filmes populares');
  }
};
export const getMostPopularSeries = async (page: number = 1) => {

  try{
    const response = await axiosInstance.get('/tv/popular', {
      params: {
            page
        }
    });
    
    return response.data;
    } catch (error) {
        console.error('Erro ao buscar séries populares:', error);
        throw new Error('Erro ao buscar séries populares');
}
};