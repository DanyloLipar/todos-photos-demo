import React from "react";
import { Album } from "../../types/Album";
import './PhotoCard.scss';

type Props = {
    album: Album;
}

export const PhotoCard: React.FC<Props> = ({ album }) => {
    return (
        <div className="card">
            <img
                className="card__img"
                src={album.url}
                alt={String(album.id)}
            />
            <h3>{album.title}</h3>
        </div>
    )
} 