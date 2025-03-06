import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjY2OTYzYjFmZWM3N2Q5ZDE5MjViOTBjOWU0NTc3MyIsIm5iZiI6MTc0MDY3MjE5My42NTEsInN1YiI6IjY3YzA4Y2MxMGQyNTVjNDRjMWM4ZTEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ASVQJysGqHXktiZlK3eQfuRA8kHalo3UKxpk6WhfAwM'

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
    
    return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os filmes:', error);
        throw new Error('Erro ao buscar os filmes');
}
};