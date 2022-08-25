import {Reviews} from '../../types/review';
import ReviewsItem from '../reviews-item/reviews-item';
import {getReviews} from '../../store/selectors';
import {useAppSelector} from '../../hooks/index';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {

  const allReviews = useAppSelector(getReviews);

  return (
    <><h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{allReviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewsItem key={review.id}
            review={review}
          />
        )
        )}
      </ul>
    </>
  );
}

export default ReviewsList;
