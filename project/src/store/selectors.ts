import {State} from '../types/state';
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
