import {createAction} from '@reduxjs/toolkit';
import { SortingType } from '../const';
import {City, Offers} from '../types/offer';

export const changeCity = createAction<{city: City}>('changeCity');
export const changeSortingType = createAction<{sortingType: SortingType}>('changeSortingType');
export const resetOffers = createAction('resetOffers');
export const loadOffers = createAction<Offers>('loadOffers');
export const setError = createAction<string | null>('setError');
export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');

