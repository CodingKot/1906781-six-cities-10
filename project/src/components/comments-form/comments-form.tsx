import {useState, ChangeEvent} from 'react';
import { RATING_MARKS } from '../../const';

function CommentsForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    commentText: '',
  });

  const ratingChangeHandle = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
  };

  const inputCommentHandle = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_MARKS.map((rating) => (
          <div key={`${rating.mark}-stars`}>
            <input className="form__rating-input visually-hidden" name="rating" value={rating.mark} id={`${rating.mark}-stars`} type="radio" onChange={ratingChangeHandle}/>
            <label htmlFor={`${rating.mark}-stars`} className="reviews__rating-label form__rating-label" title={rating.emotion}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        )
        )}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={inputCommentHandle}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default CommentsForm;
