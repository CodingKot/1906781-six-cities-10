import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import PropertySection from '../../components/property-section/property-section';
import OffersList from '../../components/offers-list/offers-list';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {getSelectedOffer, getReviews, getNearbyOffers, getPropertyPageOffers, getIsPropertyLoading} from '../../store/selectors';
import {fetchProperty} from '../../store/api-actions';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import LoadingScreen from '../../pages/loading-screen/loading-screen';


type PropertyPageProps = {
  isFormDisabled: boolean;
}

function PropertyPage({isFormDisabled}: PropertyPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isPropertyLoading = useAppSelector(getIsPropertyLoading);
  const params = useParams();
  const offer = useAppSelector(getSelectedOffer);

  useEffect(() => {
    if(typeof offer === undefined || offer?.id !== Number(params.id)) {
      dispatch(fetchProperty(Number(params.id)));
    }
  }, [params.id, offer, dispatch]);

  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const propertyPageOffers = useAppSelector(getPropertyPageOffers);
  const isProperties = offer && reviews && propertyPageOffers;

  if(isPropertyLoading || !isProperties) {
    return <LoadingScreen/>;
  }

  return (
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--property">
        <PropertySection offer={offer} reviews={reviews} isFormDisabled={isFormDisabled} offers={propertyPageOffers}/>
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
