import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {reviews} from './mocks/reviews';
import {nearbyOffers} from './mocks/nearby-offers';
import {CITIES} from './const';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message';
import {fetchOffersAction} from './store/api-actions';

store.dispatch(fetchOffersAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App
        cities={CITIES}
        reviews={reviews}
        nearbyOffers={nearbyOffers}
      />
    </Provider>
  </React.StrictMode>,
);
