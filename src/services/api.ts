import axios from 'axios';

const TOKEN =  import.meta.env.VITE_API_TOKEN;

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

export const getAllMovies = async (page: number = 1) => {

  try{
    const response = await axiosInstance.get('/trending/movie/day', {
      params: {
            page
        }
    });
    
    return{ 
      data: response.data,
      total_pages: response.data.total_pages,
    };
    } catch (error) {
        console.error('Erro ao buscar todos os filmes:', error);
        throw new Error('Erro ao buscar os filmes');
}
};