import {createReducer} from '@reduxjs/toolkit';
import {changeCity, findOffers } from './action';
import {offers} from '../mocks/offers';
import {CITIES} from '../const';


const initialState = {
  choosenCity: CITIES[0],
  choosenOffers: offers.filter((offer) => offer.city.name === 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.choosenCity = city;
    })
    .addCase(findOffers, (state, action) => {
      const offerItems = action.payload.offers;
      state.choosenOffers = offerItems.filter((item) => item.city.name === state.choosenCity?.name);
    });
});

export {reducer};
