import {State} from '../types/state';
import {Offer} from '../types/offer';
import { SortingType } from '../const';
import {comparePriceToHigh, comparePriceToLow, compareRatings} from '../utils/utils';


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

export const getIsDataLoaded = (state: State) => state.isDataLoaded;

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

