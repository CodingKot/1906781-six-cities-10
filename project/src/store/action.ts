import {createAction} from '@reduxjs/toolkit';
import { Offers, City } from '../types/offer';

export const changeCity = createAction<{city: City}>('changeCity');
export const findOffers = createAction<{offers: Offers}>('findOffers');
