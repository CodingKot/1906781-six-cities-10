import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import {Offers, Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

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
                  <div className="favorites__places">
                    {cityOffers.map((cityOffer) => {
                      const{id, title, isPremium, type, rating, price, previewImage} = cityOffer;
                      const offerLink = `${AppRoute.Room}:${id}`;
                      return (
                        <article className="favorites__card place-card" key={id}>
                          {isPremium ?
                            <div className="place-card__mark">
                              <span>Premium</span>
                            </div> : <div className="place-card__mark visually-hidden"></div>}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <Link to={offerLink}>
                              <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place"/>
                            </Link>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                <svg className="place-card__bookmark-icon" width="18" height="19">
                                  <use xlinkHref="#icon-bookmark"></use>
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{
                                  width: '100%',
                                }}
                                >
                                </span>
                                <span className="visually-hidden">{rating}</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <Link to={offerLink}>{title}</Link>
                            </h2>
                            <p className="place-card__type">{type}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
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
