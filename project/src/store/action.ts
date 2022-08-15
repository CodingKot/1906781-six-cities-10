import {createAction} from '@reduxjs/toolkit';
import { SortingType } from '../const';
import {City} from '../types/offer';

export const changeCity = createAction<{city: City}>('changeCity');
export const changeSortingType = createAction<{sortingType: SortingType}>('changeSortingType');
export const resetOffers = createAction('resetOffers');

