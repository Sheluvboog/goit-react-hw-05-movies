import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots';
 import {
  CastHeader,
  CastInfo,
  CastList,
  CastListItem,
  CastName,
  NoCastText,
  Wrapper,
} from './Cast.styled';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const { cast } = await fetchMovieCast(movieId);
        setCast(cast);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <Wrapper>
      <CastHeader>Cast</CastHeader>

      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <p>Sorry, we could not fetch the movie cast. Please try again later.</p>
      ) : cast.length ? (
        <CastList>
          {cast.map((actor) => (
            <CastListItem className="cast-card" key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={`${actor.name} profile`}
                />
              ) : (
                <img
                  src={`https://via.placeholder.com/200x300?text=No+Image`}
                  alt={`${actor.name} profile`}
                />
              )}

              <CastInfo>
                <CastName>{actor.name}</CastName>
                <p>Character: {actor.character}</p>
              </CastInfo>
            </CastListItem>
          ))}
        </CastList>
      ) : (
        <NoCastText>We don't have any information about the cast yet.</NoCastText>
      )}
    </Wrapper>
  );
};

export default Cast;
