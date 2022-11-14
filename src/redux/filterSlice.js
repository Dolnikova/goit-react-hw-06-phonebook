const { createSlice } = require('@reduxjs/toolkit');

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    onFilter(state, { payload }) {
      state = payload;
    },
  },
});

export const { onFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const getFiler = state => state.filter;
