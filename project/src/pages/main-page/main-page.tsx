import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import OffersList from '../../components/offers-list/offers-list';
import {Offers, Cities, Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {CITIES} from '../../const';
import Map from '../../components/map/map';
import { useState } from 'react';

type MainPageProps = {
  offersCount: number;
  offers: Offers;
  offerCities: Cities;
}

function MainPage(props: MainPageProps): JSX.Element {
  const {offersCount, offers, offerCities} = props;
  const currentCityIndex = offerCities.findIndex((offerCity) => offerCity.name === 'Amsterdam');
  const cityOffers = offers.filter((offer) => offer.city.name === 'Amsterdam');
  const [selectedPoint, setActivePoint] = useState<Offer | undefined>(
    undefined
  );
  const onOfferHover = (offerId: number) => {
    const currentPoint = offers.find((offer) => offer.id === offerId);
    setActivePoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li className="locations__item" key={city.name}>
                  <Link className= {`locations__item-link tabs__item ${city.name === 'Amsterdam' && 'tabs__item--active'}`} to="/">
                    <span>{city.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
              Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offers} onOfferHover={onOfferHover}/>
            </section>
            <div className="cities__right-section">
              <Map points={cityOffers} city={offerCities[currentCityIndex]} selectedPoint={selectedPoint} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
