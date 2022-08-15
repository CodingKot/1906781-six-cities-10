import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSortingType, resetOffers } from './action';
import {offers} from '../mocks/offers';
import {CITIES, SortingType} from '../const';


const initialState = {
  selectedCity: CITIES[0],
  selectedSortingType: SortingType.Populap,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.selectedCity = city;
    })
    .addCase(changeSortingType, (state, action) => {
      const {sortingType} = action.payload;
      state.selectedSortingType = sortingType;
    })
    .addCase(resetOffers, (state) => {
      state.selectedSortingType = SortingType.Populap;
    });
});

export {reducer};
