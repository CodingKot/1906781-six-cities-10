import Header from '../../components/header/header';
import Logged from '../../components/not-logged/not-logged';
import {Link} from 'react-router-dom';
import OffersList from '../../components/offers-list/offers-list';
import {useAppSelector} from '../../hooks/index';
import {getGroupedOffers} from '../../store/selectors';


function FavoritesPage(): JSX.Element {

  const groupedOffers = useAppSelector(getGroupedOffers);

  return (
    <div className="page">
      <Header>
        <Logged/>
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
