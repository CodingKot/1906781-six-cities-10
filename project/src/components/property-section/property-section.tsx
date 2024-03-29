import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';
import CommentsForm from '../../components/comments-form/comments-form';
import Map from '../../components/map/map';
import {getRatingPercent, capitalizeFirstLetter} from '../../utils/utils';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {useAppSelector} from '../../hooks/index';
import {getIsUserAuthorized} from '../../store/selectors';
import {PICTURES_MAX_NUMBER} from '../../const';
import FavoritesButton from '../../components/favorites-button/favorites-button';

type PropertySectionProps = {
  offer: Offer;
  reviews: Reviews;
  offers?: Offers;
}

function PropertySection({offer, reviews, offers}: PropertySectionProps): JSX.Element {
  const {id, title, isPremium, isFavorite, type, rating, price, goods, host, images, bedrooms, maxAdults, description, city} = offer;
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  return (
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {images.slice(0,PICTURES_MAX_NUMBER).map((image) => (
            <div className="property__image-wrapper" key = {image}>
              <img className="property__image" src={image} alt="Studio"/>
            </div>
          ))}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium && (
            <div className="property__mark">
              <span>Premium</span>
            </div>)}
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title}
            </h1>
            <FavoritesButton id={id} isFavorite={isFavorite} className='property__bookmark-button' classNameActive='property__bookmark-button--active' width={31} height={33}/>
          </div>
          <div className="property__rating rating">

            <div className="property__stars rating__stars">
              <span style={{
                width: getRatingPercent(rating),
              }}
              >
              </span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {capitalizeFirstLetter(type)}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {goods.map((good) => (
                <li className="property__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
              </div>
              <span className="property__user-name">
                {host.name}
              </span>
              {host.isPro && (<span className="property__user-status">Pro</span>)}
            </div>
            <div className="property__description">
              <p className="property__text">
                {description}
              </p>
            </div>
          </div>
          <section className="property__reviews reviews">
            <ReviewsList reviews={reviews}/>
            {isUserAuthorized && <CommentsForm id={id}/>}
          </section>
        </div>
      </div>
      <Map className="property__map" offers={offers} location={city.location} selectedOffer = {offer}/>
    </section>
  );
}

export default PropertySection;

