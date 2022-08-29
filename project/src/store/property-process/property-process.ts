import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { PropertyProcess } from '../../types/state';
import { fetchNearbyOffers, fetchReviews, addComment} from '../api-actions';


const initialState: PropertyProcess = {
  isPropertyLoading: false,
  reviews: [],
  nearbyOffers: [],
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
      .addCase(addComment.fulfilled, (state, action) => {
        state.reviews = action.payload;

      })
      .addCase(addComment.rejected, (state) => {
        throw new Error();
      });
  }
});
