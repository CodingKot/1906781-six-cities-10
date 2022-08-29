import OffersList from '../../components/offers-list/offers-list';
import {useAppSelector} from '../../hooks/index';
import {getGroupedOffers} from '../../store/selectors';
import {Link} from 'react-router-dom';

function FavoritesSection(): JSX.Element {
  const groupedOffers = useAppSelector(getGroupedOffers);


  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {groupedOffers.map(([city, cityOffers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="/">
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <OffersList offers={cityOffers}
              className="favorites__places"
              classNameForCard="favorites__card"
              classNameWrapper="favorites__image-wrapper"
              classNameInfo="favorites__card-info"
              imgHeight="110"
              imgWidth="150"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesSection;
