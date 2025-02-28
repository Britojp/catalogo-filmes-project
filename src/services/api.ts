import axios from 'axios';


const API_KEY = import.meta.env.TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
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