import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "./api";

export const initialState = {
  isLoading: false,
  hasErrors: false,
  comments: []
};

const { actions, reducer } = createSlice({
  name: "comments",
  initialState,
  reducers: {
    loading: state => {
      state.isLoading = true;
    },
    comments: (state, { payload }) => {
      state.comments = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    error: state => {
      state.isLoading = false;
      state.hasErrors = true;
    }
  }
});

const fetchComments = postId => async dispatch => {
  dispatch(actions.loading());
  getComments(postId)
    .then(data => dispatch(actions.comments(data)))
    .catch(() => dispatch(actions.error()));
};

export { fetchComments, reducer as default };
