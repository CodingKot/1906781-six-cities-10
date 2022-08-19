import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {reviews} from './mocks/reviews';
import {nearbyOffers} from './mocks/nearby-offers';
import {CITIES} from './const';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOffers, checkAuth} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffers());
store.dispatch(checkAuth());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App
        cities={CITIES}
        reviews={reviews}
        nearbyOffers={nearbyOffers}
      />
    </Provider>
  </React.StrictMode>,
);
