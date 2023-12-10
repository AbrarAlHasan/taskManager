import {createSlice} from '@reduxjs/toolkit';

export interface IToast {
  showToast: boolean;
  text: string | null;
  time: number;
  type: 'success' | 'warning' | 'error';
}

const initialState: IToast = {
  showToast: false,
  text: null,
  time: 0,
  type: 'success',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToastMessage: (state, action) => {
      return {
        ...state,
        showToast: true,
        time: action.payload.time,
        text: action.payload.text,
        type: action.payload.type ? action.payload.type : 'success',
      };
    },
    hideToast: (state, action) => {
      return {
        ...state,
        showToast: false,
        text: null,
        time: 0,
        type: 'success',
      };
    },
  },
});

export const {showToastMessage, hideToast} = toastSlice.actions;
export default toastSlice.reducer;
