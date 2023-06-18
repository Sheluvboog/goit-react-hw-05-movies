import { useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledSection,
  StyledLink,
  SectionTitle,
  List,
  ListItem,
} from './MovieList.styled';
const MovieList = ({ movies }) => {
const location = useLocation()
  return (
    <StyledSection>
      <SectionTitle>Trending today</SectionTitle>

      <List>
        {movies.map(movie => (
          <ListItem key={movie.id}>
            <StyledLink to={`/movies/${movie.id}`} state={{from:  location}}>
              {movie.title}
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </StyledSection>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MovieList;

