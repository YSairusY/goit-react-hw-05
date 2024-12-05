import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';
import { fetchTrendingMovies } from '../../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    document.title = 'Home';
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await fetchTrendingMovies();
        setMovies(fetchedMovies);
      } catch (err) {
        setError('Failed to load trending movies.');
        console.error(err);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <h1 className={s.text}>Most Popular Movies</h1>
      {error && <p className={s.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
