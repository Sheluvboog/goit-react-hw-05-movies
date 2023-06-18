import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchMovieByName } from '../services/api';
import SearchMovies from '../components/SearchMovies/SearchMovies';
import {
  List,
  ListItem,
  SectionTitle,
  StyledLink,
  StyledSection,
} from '../components/MovieList/MovieList.styled';
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    if (!query) return;

    const getMovie = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMovieByName(query);

        if (results.length === 0) {
          toast.dismiss();
          toast.error('No movies found');
          setMovies([]);
        } else {
          setMovies(results);
        }
      } catch (error) {
        toast.error(error.message);
        setMovies([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
  }, [searchParams]);

  const handleSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <main>
      <StyledSection>
        <SectionTitle>Movies Page</SectionTitle>

        <SearchMovies onSubmit={handleSubmit} />

        {isLoading && <LoadingIndicator />}
        {error && <p>Sorry, we could not fetch the movies. Please try again later.</p>}
        {movies.length > 0 && (
          <List>
            {movies.map(movie => (
              <ListItem key={movie.id}>
                <StyledLink to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </StyledLink>
              </ListItem>
            ))}
          </List>
        )}
      </StyledSection>
    </main>
  );
};

export default Movies;