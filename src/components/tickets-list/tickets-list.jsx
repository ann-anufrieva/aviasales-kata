import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Ticket from "../ticket/ticket";
import { showMore } from '../../store/slicer/ticket-slice';

import { nanoid } from "@reduxjs/toolkit";

import './tickets-list.css';

const TicktetsList = () => {
  const [filteredTickets, setFilteredTickets] = useState([]);
  const tickets = useSelector((state) => state.tickets.tickets);
  const itemsPerPage = useSelector((state) => state.tickets.addTickets);
  const checkbox = useSelector((state) => state.tickets.panel);
  
  const dispatch = useDispatch();
  const handleShowMore = () => {
    dispatch(showMore());
  };

  const visibleTickets = filteredTickets?.slice(0, itemsPerPage);

  useEffect(() => {
    const activeFilters = checkbox.filter((el) => el.isChecked);
    const variable = tickets.filter((el) => {
      const data = el.segments[0].stops.length;
      return activeFilters.some((elem) => elem.stopsCount === data);
    });
    setFilteredTickets(variable);
  }, [checkbox, tickets]);

  const elem = visibleTickets?.map((item) => (
    <Ticket
      key={nanoid()}
      price={item.price}
      img={item.carrier}
      durationTuda={item.segments[0].duration}
      durationObratno={item.segments[1]?.duration}
      dateTuda={item.segments[0].date}
      dateObratno={item.segments[1].date}
      stopsTuda={item.segments[0].stops}
      stopsObratno={item.segments[1].stops}
    />
  ));

  return (
    <div className="all-tickets">
    {elem}
    <div className="show-more">
      <button type="button" className="button-show-more" onClick={handleShowMore}>
        Показать еще 5 билетов
      </button>
    </div>
  </div>
  );
};

export default TicktetsList;