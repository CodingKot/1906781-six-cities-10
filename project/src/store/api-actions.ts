import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {redirectToRoute} from './action';
import {APIRoute, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import {NewComment} from '../types/new-comment';
import {Reviews} from '../types/review';
import { FavoriteStatus } from '../types/favorite-status';


export const fetchOffers = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchOffers',
  async(_, {dispatch, extra: api}) => {

    const {data} = await (api.get<Offers>(APIRoute.Offers));
    return data;
  },
);

export const checkAuth = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async(_, {dispatch, extra: api}) => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  },
);

export const login = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);


export const fetchReviews = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'property/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.Comments}/${id}`);
      return data;
    }
    catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchNearbyOffers = createAsyncThunk<Offers, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'property/fetchNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.Offers}/${id}/nearby`);
      return data;
    }
    catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchSelectedOffer = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchSelectedOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.Offers}/${id}`);
      return data;
    }
    catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const addComment = createAsyncThunk<Reviews, NewComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'property/addComment',
  async({id, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await (api.post<Reviews>(`${APIRoute.Comments}/${id}`, {comment, rating}));
    return data;
  },
);

export const fetchFavorites = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchFavorites',
  async(_, {dispatch, extra: api}) => {
    const {data} = await api.get(`${APIRoute.Favorites}`);
    return data;
  },
);

export const changeFavorite = createAsyncThunk<Offer, FavoriteStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/changeFavorite',
  async({id, status}, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${id}/${status}`);
    return data;
  },
);
