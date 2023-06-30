import React from 'react';

import HeaderFilter from "../header-filter/header-filter";
import TicketsList from '../tickets-list/tickets-list';
import Spinner from './spinner';

import { useSelector } from "react-redux";

import "./main.css";

function Main() {
  
  const { status } = useSelector((state) => state.tickets);
  const loading = status === "loading" && <Spinner />;
  return (
    <main className='main'>
      <HeaderFilter />
      {loading}
      <TicketsList />
    </main>
  );
}

export default Main;