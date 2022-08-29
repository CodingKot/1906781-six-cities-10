import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
  route: AppRoute;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children, route} = props;
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  if(route === AppRoute.Main) {
    return (
      isUserAuthorized
        ? <Navigate to={route}/>
        : children
    );
  }
  return (
    isUserAuthorized
      ? children
      : <Navigate to={route}/>
  );
}

export default PrivateRoute;
