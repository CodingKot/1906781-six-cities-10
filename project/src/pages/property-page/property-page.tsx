import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import {Offers} from '../../types/offer';
import { Reviews } from '../../types/review';
import {useParams} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import CommentsForm from '../../components/comments-form/comments-form';
import {getRatingPercent} from '../../utils/utils';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import {useAppSelector} from '../../hooks/index';
import {getOfferById} from '../../store/selectors';

type PropertyPageProps = {
  reviews: Reviews;
  nearbyOffers: Offers;
}

function PropertyPage(props: PropertyPageProps): JSX.Element {
  const {reviews, nearbyOffers} = props;
  const params = useParams();
  const offer = useAppSelector(getOfferById(Number(params.id)));
  if(offer === undefined) {
    return <NotFoundPage/>;
  }
  const {title, isPremium, type, rating, price, goods, host, images, bedrooms, maxAdults, description} = offer;

  const propertyPageOffers = [...nearbyOffers, offer];

  return (
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key = {image}>
                  <img className="property__image" src={image} alt="Studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>)}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
                  {type}
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
                <CommentsForm/>
              </section>
            </div>
          </div>
          <Map className="property__map" offers={propertyPageOffers} location={offer.city.location} selectedOffer = {offer}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers}
              className= "near-places__list places__list"
              classNameForCard="near-places__card"
              classNameWrapper="near-places__image-wrapper"
              imgHeight="200"
              imgWidth="260"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyPage;
