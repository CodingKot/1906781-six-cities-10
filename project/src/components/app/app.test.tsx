import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute, ResponseStatus, CITIES, SortingType} from '../../const';
import App from './app';
import { makeFakeOffers, makeFakeNearbyOffers } from '../../utils/mocks/offer/offer';
import { makeFakeReviews } from '../../utils/mocks/review/review';

const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();
const mockReviews = makeFakeReviews();
const mockNearbyOffers = makeFakeNearbyOffers();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  OFFERS: {isDataLoading: false, loadingStatus: ResponseStatus.Initial, offers: mockOffers, selectedCity: CITIES[0], selectedSortingType: SortingType.Popular},
  PROPERTIES: {isPropertyLoading: false, reviews: mockReviews, nearbyOffers: mockNearbyOffers},
});


const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App cities={CITIES}/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when User navigates to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);
    expect(screen.getByText(/cities/i)).toBeInTheDocument();
    expect(screen.getByText(/places/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigates to "/login"', () => {
    history.push(AppRoute.Login);

    render (fakeApp);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});


