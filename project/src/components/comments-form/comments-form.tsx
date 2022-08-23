import React, {useState, ChangeEvent} from 'react';
import {RATING_MARKS} from '../../const';
import {NewComment} from '../../types/new-comment';
import {addComment} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/index';
import {useRef} from 'react';

type FormProps = {
  id: number;
  isFormDisabled: boolean;
}

function CommentsForm({id, isFormDisabled}: FormProps): JSX.Element {

  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<NewComment>({
    id: id,
    comment: '',
    rating: undefined,
  });

  const [isButtonDisabled, setButtonDisabled] = useState(true);


  const handleChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
    if(formData.comment && formData.comment.length >= 50 && formData.comment.length <= 300 && formData.rating !== undefined) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const dispatch = useAppDispatch();

  return (
    <form className="reviews__form form" action="#" method="post" ref={formRef} onSubmit={(evt)=> {
      evt.preventDefault();
      dispatch(addComment(formData));
      if(formRef.current !== null) {
        formRef.current.reset();
      }
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_MARKS.map((rating) => (
          <React.Fragment key={`${rating.mark}-stars`}>
            <input className="form__rating-input visually-hidden" value={rating.mark} name="rating" id={`${rating.mark}-stars`} type="radio" required onChange={handleChange} disabled={isFormDisabled}/>
            <label htmlFor={`${rating.mark}-stars`} className="reviews__rating-label form__rating-label" title={rating.emotion}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        )
        )}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name = "comment" placeholder="Tell how was your stay, what you like and what can be improved" required minLength={50} maxLength={300} onChange={handleChange} disabled={isFormDisabled}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled || isFormDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentsForm;
