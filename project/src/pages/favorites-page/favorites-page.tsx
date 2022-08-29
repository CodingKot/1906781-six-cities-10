import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesSection from '../../components/favorites-section/favorites-section';
import {getFavorites, getIsUserAuthorized} from '../../store/selectors';
import {useEffect} from 'react';
import {fetchFavorites} from '../../store/api-actions';

function FavoritesPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  const favorites = useAppSelector(getFavorites);
  useEffect(() => {
    if(isUserAuthorized) {
      dispatch(fetchFavorites());
    }
  }, [isUserAuthorized, dispatch]);

  return (
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favorites.length === 0
              ?
              <FavoritesEmpty/>
              :
              <FavoritesSection/>
          }
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
