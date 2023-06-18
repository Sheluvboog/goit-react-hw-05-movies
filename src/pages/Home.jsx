import React, { useEffect, useState } from 'react';
import { fetchTrendMovies } from '../services/api';
import MovieList from '../components/MovieList/MovieList';
import { LoadingIndicator } from '../components/SharedLayout/LoadingDots';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchTrendMovies();
        setTrendingMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {error && (
        <p>Sorry, we could not fetch the trending movies. Please try again later.</p>
      )}
      {trendingMovies.length !== 0 && <MovieList movies={trendingMovies} />}
    </>
  );
};

export default Home;