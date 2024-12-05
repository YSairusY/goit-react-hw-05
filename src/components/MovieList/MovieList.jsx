import React from 'react';
import s from './MovieList.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import defaultPoster from '../../assets/default-movie.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.moviesList}>
      {movies.map(movie => (
        <li key={movie.id} className={s.movieItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={movie.posterUrl || defaultPoster}
              alt={movie.title}
              className={s.movieImage}
              onError={e => {
                e.target.src = defaultPoster;
              }}
            />
            <p>{movie.title}</p>
            <p className={s.release_date}>
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : 'N/A'}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
