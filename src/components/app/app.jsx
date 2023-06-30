import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../header/header";
import FilterBar from "../filter-bar/filter-bar";
import Main from "../main/main";
import { fetchTickets } from "../../store/slicer/ticket-slice";
import getTickets from '../../api/get-tickets'

import './app.css';

import { Alert } from "antd";

const App = () => {

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.tickets);
  const checkbox = useSelector((state) => state.tickets.panel);

  // получаем searchId
  useEffect(() => {
    const load = async () => {
      const data = await getTickets.getSearchId();
      localStorage.setItem("searchId", data.searchId);
      dispatch(fetchTickets());
    };
    load();
  }, []);

  const content = (
    <div className='app'>
      <Header />
      <div className='content'>
      <FilterBar/>
      {checkbox.every((el) => !el.isChecked) === false ? <Main /> : <h1> Мы ничего не нашли</h1>}
      </div>
    </div>
  );

  const mistake = (
    <Alert
      message="Поиск не дал результатов. Попробуйте перезагрузить страницу."
      type="error"
      showIcon
    />
  );

  return <div>{error ? mistake : content}</div>;
};

export default App;