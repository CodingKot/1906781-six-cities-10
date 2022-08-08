import {State} from '../types/state';

export const getSelectedCityOffers = (state: State) => state.offers.filter((item) => item.city.name === state.selectedCity?.name);


