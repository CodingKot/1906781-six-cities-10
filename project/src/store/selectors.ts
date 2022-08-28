import {State} from '../types/state';
import {Offer} from '../types/offer';
import {SortingType, AuthorizationStatus, REVIEWS_MAX_NUMBER, NameSpace, CityName } from '../const';
import {comparePriceToHigh, comparePriceToLow, compareRatings, compareDates} from '../utils/utils';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: State) => state[NameSpace.Offers].offers;

const getSelectedCity = (state:State) => state[NameSpace.Offers].selectedCity;

export const getSelectedSortingType = (state: State) => state[NameSpace.Offers].selectedSortingType;

export const filterOffers = createSelector(
  [getOffers, getSelectedCity],
  (offers, city) => {
    switch(city.name){
      case CityName.Paris:
        return offers.filter((offer) => offer.city.name === CityName.Paris);
      case CityName.Amsterdam:
        return offers.filter((offer) => offer.city.name === CityName.Amsterdam);
      case CityName.Brussels:
        return offers.filter((offer) => offer.city.name === CityName.Brussels);
      case CityName.Cologne:
        return offers.filter((offer) => offer.city.name === CityName.Cologne);
      case CityName.Hamburg:
        return offers.filter((offer) => offer.city.name === CityName.Hamburg);
      case CityName.Dusseldorf:
        return offers.filter((offer) => offer.city.name === CityName.Dusseldorf);
    }
  }
);

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
  Object.entries((state[NameSpace.Offers].offers).filter((offer) => offer.isFavorite)
    .reduce((group: {[key: string]: Offer[]}, offer) => {
      const {city} = offer;
      group[city.name] = group[city.name] ?? [];
      group[city.name].push(offer);
      return group;
    },
    {})
  ));

export const getOfferById = (id: number) => (state: State) => (state[NameSpace.Offers].offers).find((item: Offer) => item.id === id);

export const getUserData = (state: State) => state[NameSpace.User].userData;

export const getFavoriteOffers = (state: State) => state[NameSpace.Offers].offers.filter((offer) => offer.isFavorite);

export const getIsCheckingAuth = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Unknown;

export const getIsUserAuthorized = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const getSelectedOffer = (id: number) => (state: State) => state[NameSpace.Offers].offers.find((offer) => offer.id === id);

export const getReviews = (state: State) => state[NameSpace.Property].reviews;

export const getSortedReviews = (state: State) => {
  const reviews = getReviews(state);
  const sortedReviews = [...reviews];
  sortedReviews.sort(compareDates);
  if(reviews.length >= REVIEWS_MAX_NUMBER) {
    return reviews.slice(0,REVIEWS_MAX_NUMBER);
  }
  return sortedReviews;
};

export const getNearbyOffers = (state: State) => state[NameSpace.Property].nearbyOffers;

export const getIsCommentLoading = (state: State) => state[NameSpace.Property].isCommentLoading;

export const getNewCommentsNumber = (state: State) => state[NameSpace.Property].sentCommentsNumber;

