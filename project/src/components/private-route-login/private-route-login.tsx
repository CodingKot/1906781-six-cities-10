import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';

type PrivateRouteLoginProps = {
  children: JSX.Element;
}

function PrivateRouteLogin(props: PrivateRouteLoginProps): JSX.Element {
  const {children} = props;
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  return (
    isUserAuthorized
      ? <Navigate to={AppRoute.Main}/>
      : children
  );
}

export default PrivateRouteLogin;
