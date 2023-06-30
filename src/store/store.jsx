import { configureStore } from '@reduxjs/toolkit';
import TicketsReducer from './slicer/ticket-slice';

export const store = configureStore({
  reducer: {
    tickets: TicketsReducer,
  },
});