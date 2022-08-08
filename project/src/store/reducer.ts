import {createReducer} from '@reduxjs/toolkit';
import {changeCity } from './action';
import {offers} from '../mocks/offers';
import {CITIES} from '../const';


const initialState = {
  selectedCity: CITIES[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.selectedCity = city;
    });
});

export {reducer};
