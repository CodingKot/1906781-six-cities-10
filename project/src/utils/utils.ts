import {Offer} from '../types/offer';


export const getRatingPercent = (value: number) => value >= 5 ? '100%' : `${100 / 5 * Math.round(value)}%`;
export const compareRatings = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;
export const comparePriceToHigh = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const comparePriceToLow = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;

