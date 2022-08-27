import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';

type PrivateRouteFavoritesProps = {
  children: JSX.Element;
}

function PrivateRouteFavorites(props: PrivateRouteFavoritesProps): JSX.Element {
  const {children} = props;
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  return (
    isUserAuthorized
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRouteFavorites;
