import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSortingType, resetOffers, loadOffers, setDataLoadingStatus, requireAuthorization, loadUserData, loadSelectedOffer, loadReviews, loadNearbyOffers, setCommentLoadingStatus} from './action';
import {CITIES, SortingType, AuthorizationStatus} from '../const';
import {City, Offer, Offers} from '../types/offer';
import { Reviews } from '../types/review';
import {UserData} from '../types/user-data';


type InitialState = {
  selectedCity: City,
  selectedSortingType: SortingType,
  offers: Offers,
  isDataLoading: boolean,
  authorizationStatus: AuthorizationStatus;
  userData: UserData | undefined;
  selectedOffer: Offer | undefined;
  reviews: Reviews | undefined;
  nearbyOffers: Offers | undefined;
  isCommentLoading: boolean;
}

const initialState: InitialState = {
  selectedCity: CITIES[0],
  selectedSortingType: SortingType.Populap,
  offers: [],
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
  selectedOffer: undefined,
  reviews: undefined,
  nearbyOffers: undefined,
  isCommentLoading: false
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
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(loadSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setCommentLoadingStatus, (state, action) => {
      state.isCommentLoading = action.payload;
    });
});

export {reducer};
