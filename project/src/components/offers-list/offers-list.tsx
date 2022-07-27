
import {Offers} from '../../types/offer';
import Card from '../card/card';
import {MouseEvent} from 'react';

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
            className = 'cities__card'
            classNameWrapper = 'cities__image-wrapper'
            onOfferHover={offerHoverHandler}
            imgWidth = '260'
            imgHeight = '200'
          />)
      )}
    </div>
  );
}

export default OffersList;

