import {createAction} from '@reduxjs/toolkit';
import {SortingType} from '../const';
import {City, Offers, Offer} from '../types/offer';
import { Reviews } from '../types/review';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, AppRoute} from '../const';

export const changeCity = createAction<{city: City}>('changeCity');
export const changeSortingType = createAction<{sortingType: SortingType}>('changeSortingType');
export const resetOffers = createAction('resetOffers');
export const loadOffers = createAction<Offers>('loadOffers');
export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorisation');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
export const loadUserData = createAction<UserData | undefined>('loadUserData');
export const setPropertyLoading = createAction<boolean>('setPropertyLoading');
export const loadSelectedOffer = createAction<Offer>('loadSelectedOffer');
export const loadReviews = createAction<Reviews>('loadReviews');
export const loadNearbyOffers = createAction<Offers>('loadNearbyOffers');
export const setCommentLoadingStatus = createAction<boolean>('setCommentLoadingStatus');


