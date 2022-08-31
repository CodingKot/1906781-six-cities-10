import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import PropertySection from '../../components/property-section/property-section';
import OffersList from '../../components/offers-list/offers-list';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {getSelectedOffer, getSortedReviews, getNearbyOffers, getIsPropertyLoading} from '../../store/selectors';
import {fetchNearbyOffers, fetchSelectedOffer, fetchReviews} from '../../store/api-actions';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import LoadingScreen from '../../pages/loading-screen/loading-screen';


function PropertyPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isPropertyLoading = useAppSelector(getIsPropertyLoading);
  const params = useParams();
  const offer = useAppSelector(getSelectedOffer(Number(params.id)));

  useEffect(() => {
    if (!offer?.id) {
      dispatch(fetchSelectedOffer(Number(params.id)));
    }
    dispatch(fetchReviews(Number(params.id)));
    dispatch(fetchNearbyOffers(Number(params.id)));
  }, [params.id, offer?.id, dispatch]);

  const reviews = useAppSelector(getSortedReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isProperties = offer && reviews;

  if(isPropertyLoading || !isProperties) {
    return <LoadingScreen/>;
  }

  return (
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--property">
        <PropertySection offer={offer} reviews={reviews} offers={[...nearbyOffers, offer]}/>
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
