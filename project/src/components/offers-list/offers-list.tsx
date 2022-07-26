
import {Offers} from '../../types/offer';
import Card from '../card/card';
import {ClassName} from '../../const';
import { MouseEvent } from 'react';

const IMG_WIDTH = '260';
const IMG_HEIGHT = '200';

type OffersListProps = {
  offers: Offers;
  onOfferHover: (offerItemId: number) => void;

}

function OffersList({offers, onOfferHover}: OffersListProps): JSX.Element {
  const offerHoverHandler = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    onOfferHover(Number(evt.currentTarget.id));
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card key={offer.id}
            offer={offer}
            cardClassName = {ClassName.CitiesCard}
            classNameWrapper = {ClassName.CitiesImageWrapper}
            classNameInfo = {ClassName.CitiesCardInfo}
            onOfferHover={offerHoverHandler}
            imgWidth = {IMG_WIDTH}
            imgHeight = {IMG_HEIGHT}
          />)
      )}
    </div>
  );
}

export default OffersList;

