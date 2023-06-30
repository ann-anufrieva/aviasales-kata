/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, current, createAction } from "@reduxjs/toolkit";
import { orderBy, maxBy } from "lodash";

// фуникция получения билетов
async function getTickets() {
  const searchId = localStorage.getItem("searchId");
  const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
  if (!res.ok) {
    throw new Error("Fetch error");
  }

  return res.json();
}

const addTicketsArr = createAction("tickets/addTicketsArr");

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, rejectWithValue }) => {
    let stop = false;
    let count = 0;
    while (!stop) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const data = await getTickets();
        dispatch(addTicketsArr(data.tickets));
        // если на сервере ошибка, чтобы не уйти в бесконечную загрузку билетов
        stop = data.stop;
        count = 0;
      } catch (e) {
        count++;
        if (count > 3) {
          return rejectWithValue(e.message);
        }
      }
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    panel: [
      { label: "Без пересадок", id: 0, isChecked: true, stopsCount: 0 },
      { label: "1 пересадка", id: 1, isChecked: true, stopsCount: 1 },
      { label: "2 пересадка", id: 2, isChecked: true, stopsCount: 2 },
      { label: "3 пересадка", id: 3, isChecked: true, stopsCount: 3 },
    ],
    status: null,
    error: null,
    addTickets: 5,
  },

  reducers: {
    // сортировка по цене
    sortTicketByPrice(state) {
      const sortTickets = current(state.tickets).slice();
      state.tickets = orderBy(sortTickets, ["price"], ["asc"]);
    },
    // сортировка по скорости
    sortTicketByCheap(state) {
      const sortTickets = current(state.tickets).slice();
      state.tickets = orderBy(
        sortTickets,
        (item) => maxBy(item.segments, "duration").duration,
        "asc"
      );
    },
    // кнопка, выбрать все фильтры
    checkAll(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.panel = state.panel.map((el) => ({ ...el, isChecked: action.payload }));
    },
    // смена галочки на фильтре
    toggleCheck(state, action) {
      const toggledCheck = state.panel.find((check) => check.id === action.payload);
      toggledCheck.isChecked = !toggledCheck.isChecked;
    },
    // показать еще 5 карточек
    showMore(state) {
      state.addTickets += 5;
    },
    addTicketsArr(state, action) {
      state.tickets = state.tickets.concat(action.payload);
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTickets.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [fetchTickets.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { sortTicketByPrice, sortTicketByCheap, showMore, checkAll, toggleCheck } = ticketsSlice.actions;

const TicketsReducer = ticketsSlice.reducer;

export default TicketsReducer;