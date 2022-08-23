import {Link} from 'react-router-dom';
import {logout} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserData, getFavoriteOffers, getIsUserAuthorized} from '../../store/selectors';
import {AppRoute} from '../../const';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const favorites = useAppSelector(getFavoriteOffers);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  return (
    <nav className="header__nav">
      {isUserAuthorized
        ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper" style ={{
                backgroundImage: `url(${userData?.avatarUrl})`
              }}
              >
              </div>
              <span className="header__user-name user__name">{userData?.email}</span>
              <span className="header__favorite-count">{favorites.length}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link"
              to="/"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logout());
              }}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

export default HeaderNav;
