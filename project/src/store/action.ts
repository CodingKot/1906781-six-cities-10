import {createAction} from '@reduxjs/toolkit';
import {SortingType} from '../const';
import {City} from '../types/offer';
import {AppRoute} from '../const';

export const changeCity = createAction<City>('offers/changeCity');
export const changeSortingType = createAction<SortingType>('offers/changeSortingType');
export const resetOffers = createAction('offers/resetOffers');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

