import { useState } from 'react';
import {Offers} from '../../types/offer';
import Card from '../card/card';
import {CardClass} from '../../const';

type OffersListProps = {
  offers: Offers;
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(false);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card key={offer.id}
            offer={offer}
            cardClass = {CardClass.Cities}
            onMouseOver={()=>{
              setActiveCard(!activeCard);
            }}
          />)
      )}
    </div>
  );
}

export default OffersList;

