import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../../types/types';

interface CarsState {
  allCars: Car[]; // Összes autó az API-ból
}

const initialState: CarsState = {
  allCars: [],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setAllCars: (state, action: PayloadAction<Car[]>) => {
      state.allCars = action.payload;
    },
    clearAllCars: (state) => {
      state.allCars = [];
    },
  },
});

export const { setAllCars, clearAllCars } = carsSlice.actions;
export default carsSlice.reducer;
