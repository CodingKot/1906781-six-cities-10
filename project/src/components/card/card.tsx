import {Offer} from '../../types/offer';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getRatingPercent, firstToUpperCase} from '../../utils/utils';
import FavoritesButton from '../../components/favorites-button/favorites-button';

type CardProps = {
  offer: Offer;
  onOfferHover?: (offer: Offer) => void;
  onOfferLeave?: () => void;
  className: string;
  classNameWrapper: string;
  classNameInfo?: string;
  imgWidth: string;
  imgHeight: string;
}

function Card(props: CardProps): JSX.Element {
  const {offer, onOfferHover, onOfferLeave, className, classNameWrapper, classNameInfo, imgWidth, imgHeight} = props;
  const{id, title, isPremium, type, rating, price, previewImage, isFavorite} = offer;
  const offerLink = generatePath(AppRoute.Room, {id: `${id}`});

  return (
    <article className={`${className} place-card`} onMouseEnter={() => onOfferHover?.(offer)} onMouseLeave={()=>onOfferLeave?.()} id = {`${id}`}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className={`${classNameWrapper} place-card__image-wrapper`}>
        <Link
          to={offerLink}
        >
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place"/>
        </Link>
      </div>
      <div className={`${classNameInfo} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton id={id} isFavorite={isFavorite} className='place-card__bookmark-button' classNameActive='place-card__bookmark-button--active' width={18} height={19}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: getRatingPercent(rating),
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{firstToUpperCase(type)}</p>
      </div>
    </article>
  );
}

export default Card;
