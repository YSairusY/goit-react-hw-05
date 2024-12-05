import { fetchReviews } from '../../services/api.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './MovieReviews.module.css';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError('Failed to fetch movies reviews');
      } finally {
        setLoading(false);
      }
    };
    getReviews();
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

  if (!reviews || reviews.length === 0) {
    return <div>No reviews found for this movie.</div>;
  }

  const { author, author_details } = reviews;
  return (
    <div>
      <ul className={s.reviews_list}>
        {reviews.map(review => (
          <li key={review.id}>
            <p>
              <strong>Author:</strong> {review.author}
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
