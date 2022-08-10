import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import {Offers, Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import OffersList from '../../components/offers-list/offers-list';


type FavoritesPageProps = {
  offers: Offers;
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {

  const favoriteOffers = offers.filter((offer) => offer.isFavorite).reduce((group: {[key: string]: Offer[]}, offer) => {
    const {city} = offer;
    group[city.name] = group[city.name] ?? [];
    group[city.name].push(offer);
    return group;
  }, {});
  const groupedOffers = Object.entries(favoriteOffers);

  return (
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
