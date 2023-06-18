import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import {
  Author,
  NoReviewsText,
  Review,
  ReviewHeader,
  ReviewList,
  ReviewListItem,
  Wrapper,
} from './Reviews.styled';
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <Wrapper>
      <ReviewHeader>Reviews</ReviewHeader>

      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <p>Sorry, we could not fetch the movie reviews. Please try again later.</p>
      ) : reviews.length ? (
        <ReviewList className="reviews-container">
          {reviews.map((review) => (
            <ReviewListItem className="review-card" key={review.id}>
              <Author>Author: {review.author}</Author>
              <Review>{review.content}</Review>
            </ReviewListItem>
          ))}
        </ReviewList>
      ) : (
        <NoReviewsText>We don't have any reviews for this movie yet.</NoReviewsText>
      )}
    </Wrapper>
  );
};

export default Reviews;
