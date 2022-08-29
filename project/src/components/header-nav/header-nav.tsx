import {useAppSelector, useAppDispatch} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';
import HeaderHavAuth from '../header-nav-auth/header-nav-auth';
import HeaderNavNoAuth from '../header-nav-no-auth/header-nav-no-auth';
import {useEffect} from 'react';
import {fetchFavorites} from '../../store/api-actions';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  useEffect(() => {
    if(isUserAuthorized) {
      dispatch(fetchFavorites());
    }
  }, [isUserAuthorized, dispatch]);

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
