import {changeCity, offersProcess, resetOffers, changeSortingType} from './offers-process';
import {makeFakeOffers} from '../../utils/mocks/offer/offer';
import { SortingType, CITIES, ResponseStatus} from '../../const';
import {fetchOffers, fetchSelectedOffer, fetchFavorites} from '../api-actions';
import { OffersProcess } from '../../types/state';

const mockOffers = makeFakeOffers();
const mockFavorites = makeFakeOffers();
// const mockOffer = makeFakeOffer();

describe('Reducer: offersProcess', () => {
  let state: OffersProcess;
  it('without additional parameters should return initial state', () => {
    expect(offersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        selectedCity: CITIES[0],
        selectedSortingType: SortingType.Popular,
        offers: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Initial,
        favorites: [],
      });
  });
  it('should change sorting type', () => {
    state = {...state, selectedSortingType: SortingType.PriceToHigh};
    expect(offersProcess.reducer(state, changeSortingType(SortingType.PriceToHigh)))
      .toEqual({
        ...state, selectedSortingType: SortingType.PriceToHigh
      });
  });
  it('should change city', () => {
    state = {...state, selectedCity: CITIES[1]};
    expect(offersProcess.reducer(state, changeCity(CITIES[5])))
      .toEqual({
        ...state, selectedCity: CITIES[5]
      });
  });
  it('should reset sorting type', () => {
    expect(offersProcess.reducer(state, resetOffers()))
      .toEqual({
        ...state, selectedSortingType: SortingType.Popular
      });
  });
  it('should update isDataLoading to "true" while offers loading', () => {
    expect(offersProcess.reducer(state, {type: fetchOffers.pending.type}))
      .toEqual({
        ...state, isDataLoading: true
      });
  });
  it('should update offers by load offers', () => {
    expect(offersProcess.reducer(state, {type: fetchOffers.fulfilled.type, payload: mockOffers}))
      .toEqual({
        ...state, offers: mockOffers, isDataLoading: false, loadingStatus: ResponseStatus.Fulfilled
      });
  });
  it('should update loadingStatus to "rejected" and isDataLoading to "false", if offers load is rejected', () => {
    expect(offersProcess.reducer(state, {type: fetchOffers.rejected.type}))
      .toEqual({
        ...state, loadingStatus: ResponseStatus.Rejected, isDataLoading: false
      });
  });
  describe('fetchSelectedOffer test', () => {
    it('should update isDataLoading to "true" while selectedOffer is loading', () => {
      expect(offersProcess.reducer(state, {type: fetchSelectedOffer.pending.type}))
        .toEqual({
          ...state, isDataLoading: true
        });
    });
    // it('should update offers and isDataLoading to "false", if selectedOffer is loaded', () => {

    //   expect(offersProcess.reducer(state, {type: fetchSelectedOffer.fulfilled.type, payload: mockOffer}))
    //     .toEqual({
    //       ...state, isDataLoading: false
    //     });
    // });
  });
  describe('fetchFavorites test', () => {
    it('should update favorite offers', () => {
      expect(offersProcess.reducer(state, {type: fetchFavorites.fulfilled.type, payload: mockFavorites}))
        .toEqual({
          ...state, favorites: mockFavorites
        });
    });
  });
});


