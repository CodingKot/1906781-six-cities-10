import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers} from '../types/offer';
import {loadOffers, setDataLoadingStatus, requireAuthorization, redirectToRoute, loadUserData, loadSelectedOffer, loadNearbyOffers, loadReviews, setCommentLoadingStatus, setPropertyLoading} from './action';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { NewComment } from '../types/new-comment';
import { Reviews } from '../types/review';


export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOffers',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadingStatus(false));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'checkAuth',
  async(_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'login',
  async({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(loadUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);


export const fetchReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${APIRoute.Comments}/${_arg}`);
    dispatch(loadReviews(data));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchNearbyOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(`${APIRoute.Offers}/${_arg}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchProperty = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchSelectedOffer',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setPropertyLoading(true));
    const {data} = await api.get(`${APIRoute.Offers}/${_arg}`);
    dispatch(loadSelectedOffer(data));
    dispatch(fetchReviews(_arg));
    dispatch(fetchNearbyOffers(_arg));
    dispatch(setPropertyLoading(false));
  }
);

export const addComment = createAsyncThunk<void, NewComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'addComment',
  async({id, comment, rating}, {dispatch, extra: api}) => {
    dispatch(setCommentLoadingStatus(true));
    const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(loadReviews(data));
    dispatch(setCommentLoadingStatus(false));
  },
);
