import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {Offers, Cities} from '../../types/offer';
import {Reviews} from '../../types/review';


type AppScreenProps = {
  offers: Offers;
  cities: Cities;
  reviews: Reviews;
  nearbyOffers: Offers;
}

function App({offers, cities, reviews, nearbyOffers}: AppScreenProps): JSX.Element {
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
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyPage offers={offers} reviews={reviews} nearbyOffers={nearbyOffers}/>}
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
