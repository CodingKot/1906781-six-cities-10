import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import OffersList from '../../components/offers-list/offers-list';
import {Offers, Cities, Offer, City} from '../../types/offer';
import {Link} from 'react-router-dom';
import Map from '../../components/map/map';
import {useState} from 'react';
import {MouseEvent} from 'react';

type MainPageProps = {
  offersCount: number;
  offers: Offers;
  cities: Cities;
}

function MainPage(props: MainPageProps): JSX.Element {
  const {offersCount, offers, cities} = props;
  const defaultCity = cities.find((city) => city.name === 'Amsterdam');
  const cityOffers = offers.filter((offer) => offer.city.name === defaultCity?.name);
  const [selectedOffer, setActiveOffer] = useState<Offer | undefined>(
    undefined
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined> (
    defaultCity
  );
  const onOfferHover = (offerId: number) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setActiveOffer(currentOffer);
  };

  const onMouseClick = (cityName: string) => {
    const currentCity = cities.find((city) => city.name === cityName);
    setSelectedCity(currentCity);
  };

  const mouseClickHandler = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    onMouseClick(evt.currentTarget.innerText);
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
              {cities.map((city) => (
                <li className="locations__item" key={city.name} onClick = {mouseClickHandler}>
                  <Link className= {`locations__item-link tabs__item ${selectedCity?.name === city.name && 'tabs__item--active'}`} to="/">
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
              <OffersList offers={cityOffers} onOfferHover={onOfferHover}/>
            </section>
            <div className="cities__right-section">
              <Map offers={cityOffers} city={selectedCity} selectedOffer={selectedOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
