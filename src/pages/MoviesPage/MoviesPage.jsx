import React from 'react';
import { useEffect, useState } from 'react';
import s from './MoviesPage.module.css';
import { fetchSearchMovie } from '../../services/api';
import { useSearchParams, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const query = searchParams.get('name') ?? '';

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await fetchSearchMovie(query);
        if (results.length === 0) {
          setMovies([]);
          setError(
            'No movies matched your search query. Please try searching for a different title. '
          );
        } else {
          setMovies(results);
        }
      } catch (error) {
        setError('Failed to fetch movies.');
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();

    if (!trimmedQuery) {
      toast.error('Please enter a movie name to search!');
      return;
    }
    setSearchParams(trimmedQuery ? { name: trimmedQuery } : {});
    setInputValue('');
  };

  return (
    <div className={s.search}>
      <Toaster position="top-center" reverseOrder={false} />
      <form className={s.form} id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="query"
          placeholder="Search movies..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
      <div id="movies"></div>
    </div>
  );
};

export default MoviesPage;
