import { AppRoute } from '../../const';
import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {getUserData, getFavoritesNumber} from '../../store/selectors';
import {logout, fetchOffers} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';

function HeaderHavAuth(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesNumber = useAppSelector(getFavoritesNumber);
  const userData = useAppSelector(getUserData);

  const handleSignOut = async (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    await dispatch(logout());
    dispatch(fetchOffers());
  };

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper" style ={{
            backgroundImage: `url(${userData?.avatarUrl})`
          }}
          >
          </div>
          <span className="header__user-name user__name">{userData?.email}</span>
          <span className="header__favorite-count">{favoritesNumber}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link"
          to="/"
          onClick={handleSignOut}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default HeaderHavAuth;
