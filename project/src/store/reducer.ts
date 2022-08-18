import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSortingType, resetOffers, loadOffers, setDataLoadingStatus, requireAuthorization, loadUserData} from './action';
import {CITIES, SortingType, AuthorizationStatus} from '../const';
import {City, Offers} from '../types/offer';
import {UserData} from '../types/user-data';


type InitialState = {
  selectedCity: City,
  selectedSortingType: SortingType,
  offers: Offers,
  isDataLoading: boolean,
  authorizationStatus: AuthorizationStatus;
  userData: UserData;
}

const initialState: InitialState = {
  selectedCity: CITIES[0],
  selectedSortingType: SortingType.Populap,
  offers: [],
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    avatarUrl: '',
    email: '',
    id: null,
    isPro: null,
    name: '',
    token: '',
  }
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
    });
});

export {reducer};
