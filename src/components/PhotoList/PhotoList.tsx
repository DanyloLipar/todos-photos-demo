import React, { useState } from "react"
import './PhotoList.scss';
import { getPhotos } from '../../api/api';
import { Album } from "../../types/Album";
import { PhotoCard } from "../PhotoCard";

export const PhotoList: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const openedAlbum = async () => {
        try {
            setLoading(true);
            const allPhoto = await getPhotos(query);
            setAlbums(allPhoto)
            setLoading(false);
        } catch {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="whole">
            <p>Please select the number of album (1-100)</p>
            <label className='page__photos-lbl lbl'>
                <button
                    onClick={() => openedAlbum()}
                >
                    Get photo!
                </button>
                <input
                    value={query}
                    className='lbl__input'
                    onChange={event => setQuery(event.target.value)}
                />
            </label>
            {loading && (
                <p className='app__list-load'>Loading album...</p>
            )}
            {(loading && error) && (
                <p>Failed loading album</p>
            )}
            {(!error && !loading) && (<ul className="albums">
                {albums.map(album => (
                    <li
                        className="albums__content"
                        key={album.id}
                    >
                        <PhotoCard album={album} />
                    </li>
                ))}
            </ul>)}
        </div>
    )
}