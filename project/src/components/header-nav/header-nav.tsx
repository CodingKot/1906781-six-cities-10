import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';
import HeaderHavAuth from '../header-nav-auth/header-nav-auth';
import HeaderNavNoAuth from '../header-nav-no-auth/header-nav-no-auth';

function HeaderNav(): JSX.Element {

  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
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
