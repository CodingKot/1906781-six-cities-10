import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {Offers, Cities} from '../../types/offer';
import {Reviews} from '../../types/review';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {getIsDataLoaded} from '../../store/selectors';


type AppScreenProps = {
  cities: Cities;
  reviews: Reviews;
  nearbyOffers: Offers;
}

function App({cities, reviews, nearbyOffers}: AppScreenProps): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  if(isDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cities={cities} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyPage reviews={reviews} nearbyOffers={nearbyOffers}/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
