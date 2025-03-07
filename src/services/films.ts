import {getAllMovies} from '@/services/api'
import type Film from '@/types/types';

export async function fetchAllMovies(): Promise<Film[]> {
    let allMovies: Film[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
        const response = await getAllMovies(page);
        if (response.data.length > 0) {
            allMovies = allMovies.concat(response.data);
            page++;
        } else {
            hasMorePages = false;
        }
    }

    return allMovies;
}