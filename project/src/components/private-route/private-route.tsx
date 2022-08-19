import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  return (
    isUserAuthorized
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
