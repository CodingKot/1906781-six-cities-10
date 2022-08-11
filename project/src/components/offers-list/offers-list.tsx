import {Offers, Offer} from '../../types/offer';
import Card from '../card/card';


type OffersListProps = {
  offers: Offers;
  onOfferHover?: (offer: Offer) => void;
  className: string;
  classNameForCard: string;
  classNameWrapper: string;
  classNameInfo?: string;
  imgWidth: string;
  imgHeight: string;
}

function OffersList({offers, onOfferHover, className, classNameForCard, classNameWrapper, classNameInfo, imgWidth, imgHeight}: OffersListProps): JSX.Element {

  return (
    <div className={className}>
      {offers.map((offer) =>
        (
          <Card key={offer.id}
            offer={offer}
            className={classNameForCard}
            classNameWrapper={classNameWrapper}
            classNameInfo={classNameInfo}
            onOfferHover={onOfferHover}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
          />)
      )}
    </div>
  );
}

export default OffersList;

