import React, { useState } from "react"
import './PhotoList.scss';
import { getPhotos } from '../../api/api';
import { Album } from "../../types/Album";
import { PhotoCard } from "../PhotoCard";

export const PhotoList: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [query, setQuery] = useState('');

    const allPhoto = getPhotos(query);
    const openedAlbum = async (allPhoto: Promise<Album[]>) => {
        setAlbums(await allPhoto);
    };

    return (
        <div className="whole">
            <label className='page__photos-lbl lbl'>
                <button
                    onClick={() => openedAlbum(allPhoto)}
                >
                    Get photo!
                </button>
                <input
                    className='lbl__input'
                    onChange={event => setQuery(event.currentTarget.value)}
                />
            </label>
            <ul className="albums">
                {albums.map(album => (
                    <li
                        className="albums__content"
                        key={album.id}
                    >
                        <PhotoCard album={album} />
                    </li>
                ))}
            </ul>
        </div>
    )
}