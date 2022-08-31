import {MouseEvent, useState} from 'react';
import {AppRoute, FavoriteOfferStatus} from '../../const';
import {changeFavorite, fetchFavorites} from '../../store/api-actions';
import {redirectToRoute} from '../../store/action';
import {getIsUserAuthorized} from '../../store/selectors';
import {useAppSelector, useAppDispatch} from '../../hooks/index';

type FavoritesButtonProps = {
  id: number;
  isFavorite: boolean;
  className: string;
  classNameActive: string;
  width: number;
  height: number;
}

function FavoritesButton(props: FavoritesButtonProps): JSX.Element {
  const {id, isFavorite, className, classNameActive, width, height} = props;
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const dispatch = useAppDispatch();
  const updateFavorites = async(offerId: number, favoriteStatus: boolean) => {
    setButtonDisabled(true);
    const status = favoriteStatus ? FavoriteOfferStatus.FavoriteDelete : FavoriteOfferStatus.FavoriteAdd;
    await dispatch(changeFavorite({id: offerId, status}));
    await dispatch(fetchFavorites());
    setButtonDisabled(false);
  };

  const handleFavoriteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(!isUserAuthorized) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      updateFavorites(id, isFavorite);
    }
  };
  return (
    <button className={`${className} button ${isFavorite && classNameActive}`} type="button" onClick={handleFavoriteClick} disabled={isButtonDisabled}>
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoritesButton;
