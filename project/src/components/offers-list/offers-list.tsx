import {Offers, Offer} from '../../types/offer';
import Card from '../card/card';


type OffersListProps = {
  offers: Offers;
  onOfferHover: (offer: Offer) => void;
}

function OffersList({offers, onOfferHover}: OffersListProps): JSX.Element {
  const offerHoverHandler = (offer: Offer) => {
    onOfferHover(offer);
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

