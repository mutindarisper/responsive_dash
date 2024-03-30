import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  mode: string;
  link: string;
}

const initialState: CounterState = {
  value: 0,
  mode:'light',
  link:''
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    decrement(state) {
      state.value--;
    },
    changeMode(state, action: PayloadAction<string>){
      state.mode = action.payload
    },

    changeLink(state, action: PayloadAction<string>){
      state.link = action.payload
    }
  },
});

export const { increment, decrement, changeMode, changeLink} = counterSlice.actions;

export default counterSlice.reducer;
