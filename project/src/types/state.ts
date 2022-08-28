import {store} from '../store/index.js';
import {AuthorizationStatus, SortingType} from '../const';
import {City, Offers, Offer} from './offer';
import {UserData} from './user-data';
import {Reviews} from './review';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData?: UserData,
};

export type OffersProcess = {
  selectedCity: City,
  selectedSortingType: SortingType,
  offers: Offers,
  isDataLoading: boolean,
  favorites: Offers,
  processingOffer: Offer | undefined,
  isFavoritesLoading: boolean,
}

export type PropertyProcess = {
  isPropertyLoading: boolean;
  reviews: Reviews;
  nearbyOffers: Offers;
  isCommentLoading: boolean;
  sentCommentsNumber: number;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
