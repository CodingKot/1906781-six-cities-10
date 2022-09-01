import {Offer, City, Offers} from '../types/offer';
import { Review } from '../types/review';


export const getRatingPercent = (value: number) => value >= 5 ? '100%' : `${100 / 5 * Math.round(value)}%`;
export const compareRatings = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;
export const comparePriceToHigh = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const comparePriceToLow = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;


export const compareDates = (reviewA: Review, reviewB: Review) => Date.parse(reviewB.date) - Date.parse(reviewA.date);


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomCity = (cities: City[]) => cities[getRandomInteger(0, cities.length - 1)];

export const updateItem = (items: Offers, newItem: Offer) => {
  const index = items.findIndex((item) => item.id === newItem?.id );
  items = [...items.slice(0, index),
    newItem,
    ...items.slice(index + 1)];
  return items;
};

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

