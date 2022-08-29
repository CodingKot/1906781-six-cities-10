import {Offer} from '../../types/offer';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getRatingPercent} from '../../utils/utils';
import {changeFavorite, fetchFavorites} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {MouseEvent} from 'react';
import {getIsUserAuthorized, getIsFavoritesLoading} from '../../store/selectors';
import {redirectToRoute} from '../../store/action';
import classnames from 'classnames';

type CardProps = {
  offer: Offer;
  onOfferHover?: (offer: Offer) => void;
  className: string;
  classNameWrapper: string;
  classNameInfo?: string;
  imgWidth: string;
  imgHeight: string;
}

function Card(props: CardProps): JSX.Element {
  const {offer, onOfferHover, className, classNameWrapper, classNameInfo, imgWidth, imgHeight} = props;
  const{id, title, isPremium, type, rating, price, previewImage, isFavorite} = offer;
  const offerLink = generatePath(AppRoute.Room, {id: `${id}`});
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const dispatch = useAppDispatch();
  const isFavoritesLoading = useAppSelector(getIsFavoritesLoading);

  const handleFavoriteClick = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(!isUserAuthorized) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      const status = isFavorite ? 0 : 1;
      await dispatch(changeFavorite({id, status}));
      dispatch(fetchFavorites());
    }
  };

  return (
    <article className={`${className} place-card`} onMouseEnter={() => onOfferHover?.(offer)} id = {`${id}`}>
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
          <button className={classnames('place-card__bookmark-button', 'button', {'place-card__bookmark-button--active' : isFavorite})} type="button" onClick={handleFavoriteClick} disabled={isFavoritesLoading}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
