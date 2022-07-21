import { useState } from 'react';
import {Offers} from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  offers: Offers;
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const results = useState<number>();
  const setActiveCard = results[1];

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card key={offer.id}
            offer={offer}
            onMouseOver={()=>{
              setActiveCard(offer.id);
            }}
          />)
      )}
    </div>
  );
}

export default OffersList;

