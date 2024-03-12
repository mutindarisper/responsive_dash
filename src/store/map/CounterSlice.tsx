import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  mode: string;
}

const initialState: CounterState = {
  value: 0,
  mode:'light'
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
    }
  },
});

export const { increment, decrement, changeMode } = counterSlice.actions;

export default counterSlice.reducer;
