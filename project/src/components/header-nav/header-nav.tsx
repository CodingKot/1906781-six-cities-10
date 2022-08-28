import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized, getIsFavoritesLoading} from '../../store/selectors';
import HeaderHavAuth from '../header-nav-auth/header-nav-auth';
import HeaderNavNoAuth from '../header-nav-no-auth/header-nav-no-auth';
import LoadingFavorites from '../loading-favorites/loading-favorites';

function HeaderNav(): JSX.Element {

  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const isLoading = useAppSelector(getIsFavoritesLoading);
  if(isLoading) {
    return (
      <LoadingFavorites/>
    );
  }
  return (
    <nav className="header__nav">
      {isUserAuthorized
        ?
        <HeaderHavAuth/>
        :
        <HeaderNavNoAuth/>}
    </nav>
  );
}

export default HeaderNav;
