import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
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
  favorites: [],
  processingOffer: undefined,
  isFavoritesLoading: false,
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
      })
      .addCase(fetchSelectedOffer.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSelectedOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
        state.isDataLoading = false;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(changeFavorite.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        state.isFavoritesLoading = false;
        state.processingOffer = action.payload;
        if(state.processingOffer?.isFavorite) {
          state.offers = updateItem(state.offers, state.processingOffer);
        } else {
          state.offers = updateItem(state.offers, state.processingOffer);
        }
      });
  }
});
