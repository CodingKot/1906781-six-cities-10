import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSortingType, resetOffers, loadOffers, setError, setDataLoadedStatus} from './action';
import {CITIES, SortingType} from '../const';
import {City, Offers} from '../types/offer';


type InitialState = {
  selectedCity: City,
  selectedSortingType: SortingType,
  offers: Offers,
  isDataLoaded: boolean,
  error: string | null;

}

const initialState: InitialState = {
  selectedCity: CITIES[0],
  selectedSortingType: SortingType.Populap,
  offers: [],
  isDataLoaded: false,
  error: null,
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
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
