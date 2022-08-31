import {State} from '../types/state';
import {Offer} from '../types/offer';
import {SortingType, AuthorizationStatus, REVIEWS_MAX_NUMBER, NameSpace } from '../const';
import {comparePriceToHigh, comparePriceToLow, compareRatings, compareDates} from '../utils/utils';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: State) => state[NameSpace.Offers].offers;

export const getSelectedCity = (state:State) => state[NameSpace.Offers].selectedCity;

export const getSelectedSortingType = (state: State) => state[NameSpace.Offers].selectedSortingType;

export const filterOffers = createSelector(
  [getOffers, getSelectedCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name));

export const sortOffers = createSelector(
  [filterOffers, getSelectedSortingType],
  (offers, type) => {
    if(offers) {
      const sortedOffers = [...offers];
      switch (type) {
        case SortingType.Populap:
          return offers;
        case SortingType.PriceToHigh:
          return sortedOffers.sort(comparePriceToHigh);
        case SortingType.PriceToLow:
          return sortedOffers.sort(comparePriceToLow);
        case SortingType.TopRated:
          return sortedOffers.sort(compareRatings);
      }
    }
  }
);

export const getIsDataLoading = (state: State):boolean => state[NameSpace.Offers].isDataLoading;

export const getIsPropertyLoading = (state: State) => state[NameSpace.Property].isPropertyLoading;

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const getGroupedOffers = (state: State) => (
  Object.entries((getOffers(state)).filter((offer) => offer.isFavorite)
    .reduce((group: {[key: string]: Offer[]}, offer) => {
      const {city} = offer;
      group[city.name] = group[city.name] ?? [];
      group[city.name].push(offer);
      return group;
    },
    {})
  ));

export const getOfferById = (id: number) => (state: State) => (getOffers(state)).find((item: Offer) => item.id === id);

export const getUserData = (state: State) => state[NameSpace.User].userData;

export const getIsCheckingAuth = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Unknown;

export const getIsUserAuthorized = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const getSelectedOffer = (id: number) => (state: State) => state[NameSpace.Offers].offers.find((offer) => offer.id === id);

export const getReviews = (state: State) => state[NameSpace.Property].reviews;

export const getSortedReviews = (state: State) => {
  const reviews = getReviews(state);
  const sortedReviews = [...reviews];
  sortedReviews.sort(compareDates);
  return sortedReviews.slice(0, REVIEWS_MAX_NUMBER);
};

export const getNearbyOffers = (state: State) => state[NameSpace.Property].nearbyOffers;

export const getFavorites = (state: State) => state[NameSpace.Offers].favorites;

export const getFavoritesNumber = (state: State) => state[NameSpace.Offers].offers.filter((offer) => offer.isFavorite).length;
export const getDataStatus = (state: State) => state[NameSpace.Offers].loadingStatus;


