import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './Authentication';
import toastReducer from './ToastSlice';

export const store = configureStore({
  reducer: {authenticationReducer, toast: toastReducer},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AuthState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
