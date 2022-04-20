import { Album } from "../types/Album";
const BASE_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';

export const getPhotos = (query: string): Promise<Album[]> => {
    return fetch(`${BASE_URL}${query}`)
        .then(response => response.json())
}