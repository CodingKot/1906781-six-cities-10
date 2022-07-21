import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type CardProps = {
  offer: Offer;
  onMouseOver: ()=> void;
}

function Card(props: CardProps): JSX.Element {
  const {offer, onMouseOver} = props;
  const{id, title, isPremium, type, rating, price, previewImage} = offer;
  const offerLink = `${AppRoute.Room}:${id}`;
  return (
    <article className="cities__card place-card" onMouseOver={onMouseOver}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : <div className="place-card__mark visually-hidden"></div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: '80%',
            }}
            >
            </span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
