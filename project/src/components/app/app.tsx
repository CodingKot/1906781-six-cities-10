import {Route, Routes} from 'react-router-dom';
import {AppRoute, ResponseStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import LoadingErrorScreen from '../../pages/loading-error-screen/loading-error-screen';
import {Cities} from '../../types/offer';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {getIsDataLoading, getIsCheckingAuth, getDataStatus} from '../../store/selectors';

type AppScreenProps = {
  cities: Cities;
}

function App({cities}: AppScreenProps): JSX.Element {

  const isDataLoading = useAppSelector(getIsDataLoading);
  const isCheckingAuth = useAppSelector(getIsCheckingAuth);
  const loadingStatus = useAppSelector(getDataStatus);

  if(isCheckingAuth || isDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  if(loadingStatus === ResponseStatus.Rejected) {
    return (
      <LoadingErrorScreen/>
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage cities={cities} />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
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

  );
}

export default App;
