import {Link} from 'react-router-dom';
import {logout} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserData, getFavoriteOffers} from '../../store/selectors';

function Logged(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const favorites = useAppSelector(getFavoriteOffers);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userData.email}</span>
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
    </nav>
  );
}

export default Logged;
