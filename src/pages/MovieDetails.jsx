import { Suspense, useEffect, useState } from 'react';
import { useParams, Outlet, useLocation, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { fetchMovieById } from '../services/api';
import MovieCard from '../components/MovieCard/MovieCard';
import { Button, Container } from './MovieDelails.styled';
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots';

const MovieDelails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSelectedMovie = async (movieId) => {
      try {
        setIsLoading(true);
        const movieData = await fetchMovieById(movieId);
        setSelectedMovie(movieData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedMovie(movieId);
  }, [movieId]);

  return (
    <main>
      <Container>
        {isLoading && <LoadingIndicator />}
        {error && <div>Error: {error.message}</div>}
        {!isLoading && !error && (
          <>
            <Link to={location?.state?.from ?? '/'}>
              <Button type="button">
                <BsArrowLeftShort
                  style={{ width: '25px', height: '25px', display: 'inline-block' }}
                />
                Go back
              </Button>
            </Link>

            {selectedMovie && <MovieCard movie={selectedMovie} />}

            <Suspense fallback={<LoadingIndicator />}>
              <Outlet />
            </Suspense>
          </>
        )}
      </Container>
    </main>
  );
};

export default MovieDelails;