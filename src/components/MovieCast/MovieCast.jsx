import { useParams } from 'react-router-dom';
import { fetchCast, fetchPosters } from '../../services/api';
import React, { useEffect, useState } from 'react';
import s from './MovieCast.module.css';
import Loader from '../Loader/Loader';

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCasts = async () => {
      try {
        setLoading(true);
        const [posterBaseUrl, castData] = await Promise.all([
          fetchPosters(),
          fetchCast(movieId),
        ]);
        setBaseUrl(posterBaseUrl);
        setCasts(castData);
      } catch (error) {
        setError('Failed to fetch movie cast');
      } finally {
        setLoading(false);
      }
    };
    getCasts();
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!casts || casts.length === 0) {
    return <div>No cast info found for this movie.</div>;
  }

  return (
    <div>
      <h2 className={s.header}>Cast</h2>
      <ul className={s.list_casts}>
        {casts.map(cast => (
          <li key={cast.id} className={s.cast_item}>
            <div className={s.cast_container}>
              {cast.profile_path ? (
                <img
                  src={`${baseUrl}w200${cast.profile_path}`}
                  alt={cast.name}
                  className={s.cast_image}
                />
              ) : (
                <p className={s.no_image}>No image available</p>
              )}
              <div className={s.cast_text}>
                <p>
                  <strong>Name:</strong> {cast.name}
                </p>
                <p>
                  <strong>Character:</strong> {cast.character}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
