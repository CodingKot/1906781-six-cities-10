import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRouteFavorites from '../private-route-favorites/private-route-favorites';
import {Cities} from '../../types/offer';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {getIsDataLoading, getIsCheckingAuth} from '../../store/selectors';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import PrivateRouteLogin from '../private-route-login/private-route-login';

type AppScreenProps = {
  cities: Cities;
}

function App({cities}: AppScreenProps): JSX.Element {

  const isDataLoading = useAppSelector(getIsDataLoading);
  const isCheckingAuth = useAppSelector(getIsCheckingAuth);


  if(isCheckingAuth || isDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cities={cities} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRouteFavorites>
              <FavoritesPage />
            </PrivateRouteFavorites>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRouteLogin>
              <LoginPage/>
            </PrivateRouteLogin>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyPage/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
