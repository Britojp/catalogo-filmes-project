export default interface Film {
  backdrop_path: string;
  genre_ids: number[];
  genres: string[];
  id: number;
  overview: string;
  release_date: string;
  first_air_date: string;
  media_type: string;
  title: string;
  name: string;
  vote_average: number;
  favorite: boolean;
  poster_path: string;
  popularity: string;
  vote_count: number;
  adult: boolean;
}


export const genresMoviesDB: { name: string, id: number }[] = [
  { name: 'Action', id: 28 },
  { name: 'Adventure', id: 12 },
  { name: 'Animation', id: 16 },
  { name: 'Comedy', id: 35 },
  { name: 'Crime', id: 80 },
  { name: 'Documentary', id: 99 },
  { name: 'Drama', id: 18 },
  { name: 'Family', id: 10751 },
  { name: 'Fantasy', id: 14 },
  { name: 'History', id: 36 },
  { name: 'Horror', id: 27 },
  { name: 'Music', id: 10402 },
  { name: 'Mystery', id: 9648 },
  { name: 'Romance', id: 10749 },
  { name: 'Science Fiction', id: 878 },
  { name: 'TV Movie', id: 10770 },
  { name: 'Thriller', id: 53 },
  { name: 'War', id: 10752 },
  { name: 'Western', id: 37 },
  { name: 'Action & Adventure', id: 10759 },
  { name: 'Kids', id: 10762 },
  { name: 'News', id: 10763 },
  { name: 'Reality', id: 10764 },
  { name: 'Sci-Fi & Fantasy', id: 10765 },
  { name: 'Soap', id: 10766 },
  { name: 'Talk', id: 10767 },
  { name: 'War & Politics', id: 10768 }
];
