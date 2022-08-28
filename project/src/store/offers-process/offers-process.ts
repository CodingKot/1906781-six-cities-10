import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersProcess} from '../../types/state';
import {fetchOffers, fetchSelectedOffer} from '../api-actions';
import {CITIES, SortingType} from '../../const';
import {changeCity, changeSortingType, resetOffers} from '../action';

const initialState: OffersProcess = {
  selectedCity: CITIES[0],
  selectedSortingType: SortingType.Populap,
  offers: [],
  isDataLoading: false
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(changeCity, (state, action) => {
        state.selectedCity = action.payload;
      })
      .addCase(changeSortingType, (state, action) => {
        state.selectedSortingType = action.payload;
      })
      .addCase(resetOffers, (state, action) => {
        state.selectedSortingType = SortingType.Populap;
      })
      .addCase(fetchOffers.pending, (state, action) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSelectedOffer.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSelectedOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
        state.isDataLoading = false;
      });
  }
});
