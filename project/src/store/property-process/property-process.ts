import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { PropertyProcess } from '../../types/state';
import { fetchNearbyOffers, fetchReviews, addComment} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: PropertyProcess = {
  isPropertyLoading: false,
  reviews: [],
  nearbyOffers: [],
  isCommentLoading: false,
  sentCommentsNumber: 0,
};

export const propertyProcess = createSlice({
  name: NameSpace.Property,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isPropertyLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isPropertyLoading = false;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isPropertyLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isPropertyLoading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isCommentLoading = false;
        state.sentCommentsNumber = state.sentCommentsNumber + 1;
      })
      .addCase(addComment.rejected, (state) => {
        state.isCommentLoading = false;
        toast.warn('Sorry, failed to load new comment', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }
});
