import React, {useState, ChangeEvent, FormEvent} from 'react';
import {RATING_MARKS, MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from '../../const';
import {addComment} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/index';
import {toast} from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

type FormProps = {
  id: number;
}

function CommentsForm({id}: FormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const resetForm = () => {
    setComment('');
    setRating(undefined);
  };

  const checkDisabled = (text: string, stars?: number) => {
    const disabled = text.length < MIN_REVIEW_LENGTH || text.length > MAX_REVIEW_LENGTH || !stars;
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

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormDisabled(true);
    setSubmitButtonDisabled(true);
    dispatch(addComment({id, comment, rating}))
      .then(unwrapResult)
      .then(() => {
        resetForm();
        setFormDisabled(false);
      })
      .catch ((err) => {
        toast.warn('Sorry, failed to load new comment', {
          position: toast.POSITION.TOP_CENTER
        });
        setFormDisabled(false);
        setSubmitButtonDisabled(false);
      });
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
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentsForm;
