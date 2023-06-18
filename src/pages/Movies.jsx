import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchMovieByName } from '../services/api';
import SearchMovies from '../components/SearchMovies/SearchMovies';
import {
  SectionTitle,
  StyledSection,
} from '../components/MovieList/MovieList.styled';
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots';
import MovieList from '../components/MovieList/MovieList';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    if (!query) return;

    const getMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMovieByName(query);

        if (results.length === 0) {
          toast.dismiss();
          toast.error('No movies found');
        }

        setSearchResults(results);
      } catch (error) {
        toast.error(error.message);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
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
        {error && (
          <p>Sorry, we could not fetch the trending movies. Please try again later.</p>
        )}
        {searchResults.length !== 0 && <MovieList movies={searchResults} />}
      </StyledSection>
    </main>
  );
};

export default Movies;
