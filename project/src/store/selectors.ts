import {State} from '../types/state';
import {Offer} from '../types/offer';
import {SortingType, AuthorizationStatus} from '../const';
import {comparePriceToHigh, comparePriceToLow, compareRatings, compareDates} from '../utils/utils';


export const getSelectedCityOffers = (state: State) => state.offers.filter((item) => item.city.name === state.selectedCity?.name);

export const getSortedCityOffers = (state: State) => {
  const offers = getSelectedCityOffers(state);
  switch (state.selectedSortingType) {
    case SortingType.Populap:
      return offers;
    case SortingType.PriceToHigh:
      return offers.sort(comparePriceToHigh);
    case SortingType.PriceToLow:
      return offers.sort(comparePriceToLow);
    case SortingType.TopRated:
      return offers.sort(compareRatings);
  }
};

export const getIsDataLoading = (state: State) => state.isDataLoading;

export const getIsPropertyLoading = (state: State) => state.isPropertyLoading;

export const getAuthorizationStatus = (state: State) => state.authorizationStatus;

export const getGroupedOffers = (state: State) => (
  Object.entries((state.offers).filter((offer) => offer.isFavorite)
    .reduce((group: {[key: string]: Offer[]}, offer) => {
      const {city} = offer;
      group[city.name] = group[city.name] ?? [];
      group[city.name].push(offer);
      return group;
    },
    {})
  ));


export const getOfferById = (id: number) => (state: State) => (state.offers).find((item) => item.id === id);

export const getUserData = (state: State) => state.userData;

export const getFavoriteOffers = (state: State) => state.offers.filter((offer) => offer.isFavorite);

export const getIsCheckingAuth = (state: State) => state.authorizationStatus === AuthorizationStatus.Unknown;

export const getIsUserAuthorized = (state: State) => state.authorizationStatus === AuthorizationStatus.Auth;

export const getSelectedOffer = (id: number) => (state: State) => state.offers.find((offer) => offer.id === id);

export const getReviews = (state: State) => state.reviews;

export const getSortedReviews = (state: State) => {
  const reviews = [...getReviews(state)];
  reviews.sort(compareDates);
  if(reviews.length >= 10) {
    return reviews.slice(0,10);
  }
  return reviews;
};

export const getNearbyOffers = (state: State) => state.nearbyOffers;

export const getPropertyPageOffers = (offer: Offer) => (state: State) => [...state.nearbyOffers, offer];


export const getIsCommentLoading = (state: State) => state.isCommentLoading;


