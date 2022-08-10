import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import OffersList from '../../components/offers-list/offers-list';
import {Cities, Offer, City} from '../../types/offer';
import Map from '../../components/map/map';
import {useState} from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeCity} from '../../store/action';
import {getSelectedCityOffers} from '../../store/selectors';

type MainPageProps = {
  cities: Cities;
}

function MainPage(props: MainPageProps): JSX.Element {
  const {cities} = props;

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const selectedCity = useAppSelector((state) => state.selectedCity);
  const cityOffers = useAppSelector(getSelectedCityOffers);
  const dispatch = useAppDispatch();

  const handleOfferHover = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  const handleCityClick = (city: City) => {
    dispatch(changeCity({city}));
    setSelectedOffer(undefined);
  };

  const handelClick = (city: City) => {
    handleCityClick(city);
  };

  return (
    <div className="page page--gray page--main">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={cities} selectedCity = {selectedCity} onCityClick = {handelClick}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {selectedCity?.name}</b>
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
              <OffersList className = 'cities__places-list places__list tabs__content'
                offers={cityOffers}
                onOfferHover={handleOfferHover}
                classNameForCard={'cities__card'}
                classNameWrapper={'cities__image-wrapper'}
                imgHeight={'200'}
                imgWidth={'260'}

              />
            </section>
            <div className="cities__right-section">
              <Map className = 'cities__map' offers={cityOffers} location={selectedCity.location} selectedOffer={selectedOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
