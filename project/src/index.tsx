import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {nearbyOffers} from './mocks/nearby-offers';
import {CITIES} from './const';
import {Provider} from 'react-redux';
import {store} from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={offers}
        cities={CITIES}
        reviews={reviews}
        nearbyOffers={nearbyOffers}
      />
    </Provider>
  </React.StrictMode>,
);
