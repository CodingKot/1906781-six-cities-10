import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, ResponseStatus} from '../../const';
import {OffersProcess} from '../../types/state';
import {fetchOffers, fetchSelectedOffer, fetchFavorites, changeFavorite} from '../api-actions';
import {CITIES, SortingType} from '../../const';
import {changeCity, changeSortingType, resetOffers} from '../action';
import {updateItem} from '../../utils/utils';


const initialState: OffersProcess = {
  selectedCity: CITIES[0],
  selectedSortingType: SortingType.Populap,
  offers: [],
  isDataLoading: false,
  loadingStatus: ResponseStatus.Initial,
  favorites: [],
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
      .addCase(resetOffers, (state) => {
        state.selectedSortingType = SortingType.Populap;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
        state.loadingStatus = ResponseStatus.Fulfilled;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isDataLoading = false;
        state.loadingStatus = ResponseStatus.Rejected;
      })
      .addCase(fetchSelectedOffer.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSelectedOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
        state.isDataLoading = false;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        state.offers = updateItem(state.offers, action.payload);
      });
  }
});
