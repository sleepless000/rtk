import { createSlice } from "@reduxjs/toolkit";
import { getPost, getPosts } from "./api";

export const initialState = {
  isLoading: false,
  hasErrors: false,
  posts: [],
  post: {}
};

const { actions, reducer } = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loading: state => {
      state.isLoading = true;
    },
    post: (state, { payload }) => {
      state.post = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    posts: (state, { payload }) => {
      state.posts = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    error: state => {
      state.isLoading = false;
      state.hasErrors = true;
    }
  }
});

const fetchPost = id => async dispatch => {
  dispatch(actions.loading());
  getPost(id)
    .then(data => dispatch(actions.post(data)))
    .catch(() => dispatch(actions.error()));
};

const fetchPosts = () => async dispatch => {
  dispatch(actions.loading());
  getPosts()
    .then(data => dispatch(actions.posts(data)))
    .catch(() => dispatch(actions.error()));
};

export { fetchPosts, fetchPost, reducer as default };
