import Header from '../../components/header/header';
import NotLogged from '../../components/not-logged/not-logged';
import OffersList from '../../components/offers-list/offers-list';
import {Cities, Offer, City} from '../../types/offer';
import Map from '../../components/map/map';
import {useState} from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeCity, changeSortingType, resetOffers} from '../../store/action';
import {getSelectedCityOffers, getSortedCityOffers, getAuthorizationStatus} from '../../store/selectors';
import SortingForm from '../../components/sorting-form/sorting-form';
import {SortingType, AuthorizationStatus} from '../../const';
import Logged from '../../components/logged/logged';

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
  const selectedSortingType = useAppSelector((state) => state.selectedSortingType);
  const sortedCityOffers = useAppSelector(getSortedCityOffers);

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
    dispatch(resetOffers());
  };

  const handleSortingChange = (sortingType: SortingType) => {
    dispatch(changeSortingType({sortingType}));
  };

  return (
    <div className="page page--gray page--main">
      <Header>
        {useAppSelector(getAuthorizationStatus) !== AuthorizationStatus.Auth
          ? <NotLogged/>
          : <Logged/>}
      </Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={cities} selectedCity = {selectedCity} onCityClick = {handelClick}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {selectedCity?.name}</b>
              <SortingForm selectedSortingType={selectedSortingType} onSortChange={handleSortingChange} />
              <OffersList className="cities__places-list places__list tabs__content"
                offers={sortedCityOffers}
                onOfferHover={handleOfferHover}
                classNameForCard="cities__card"
                classNameWrapper="cities__image-wrapper"
                imgHeight="200"
                imgWidth="260"

              />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" offers={cityOffers} location={selectedCity.location} selectedOffer={selectedOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
