import React, {useState, ChangeEvent, FormEvent} from 'react';
import {RATING_MARKS} from '../../const';
import {addComment} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/index';
import {toast} from 'react-toastify';

type FormProps = {
  id: number;
}

function CommentsForm({id}: FormProps): JSX.Element {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);

  const resetForm = () => {
    setComment('');
    setRating(undefined);
  };


  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const checkDisabled = (text: string, stars?: number) => {
    const disabled = text.length < 50 || text.length > 300 || !stars;
    setSubmitButtonDisabled(disabled);
  };

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(target.value));
    checkDisabled(comment, Number(target.value));
  };

  const handleCommentChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
    checkDisabled(target.value, rating);
  };

  const dispatch = useAppDispatch();

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormDisabled(true);
    try {
      await dispatch(addComment({id, comment, rating}));
      resetForm();
    }
    catch {
      toast.warn('Sorry, failed to load new comment', {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setFormDisabled(false);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_MARKS.map((ratingItem) => (
          <React.Fragment key={`${ratingItem.mark}-stars`}>
            <input className="form__rating-input visually-hidden" value={ratingItem.mark} name="rating" id={`${ratingItem.mark}-stars`} type="radio" required onChange={handleRatingChange} disabled={isFormDisabled} checked={ratingItem.mark === rating}/>
            <label htmlFor={`${ratingItem.mark}-stars`} className="reviews__rating-label form__rating-label" title={ratingItem.emotion}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        )
        )}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name = "comment" placeholder="Tell how was your stay, what you like and what can be improved" required minLength={50} maxLength={300} onChange={handleCommentChange} disabled={isFormDisabled} value={comment}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled || isFormDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentsForm;
