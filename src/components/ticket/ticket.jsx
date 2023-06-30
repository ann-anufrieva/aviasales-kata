import React from "react";
import { getTimeFromMins, convertDate } from "./utils/getTimeFromMins";
import wordOfNum from "./utils/convertDate";

import './ticket.css';

import PropTypes from "prop-types";

const Ticket = (props) => {
  const {
    price,
    img,
    durationTuda,
    durationObratno,
    dateTuda,
    dateObratno,
    stopsTuda,
    stopsObratno,
  } = props;

  const baseUrl = "https://pics.avs.io/99/36/";

  return (
<div className='ticket'>
    <div className='ticket__header'>
        <span className='ticket__span'>{price} Р</span>
        <img src={img ? `${baseUrl}${img}.png` : null} alt="logo" />
      </div>
      <div className='ticket__content'>
        <div className='ticket__wrapper'>
          <div className='head'>MOW - HKT</div>
          <div className='content'>{convertDate(dateTuda, durationTuda)}</div>
        </div>
        <div className='ticket__wrapper'>
          <div className='head'>В ПУТИ</div>
          <div className='content'>{getTimeFromMins(durationTuda)}</div>
        </div>
        <div className='ticket__wrapper'>
          <div className='head'>{wordOfNum(stopsTuda)}</div>
          <div className='content'>{stopsTuda.join(", ")}</div>
        </div>
      </div>
      <div className='ticket__content'>
        <div className='ticket__wrapper'>
          <div className='head'>HKT - MOW</div>
          <div className='content'>{convertDate(dateObratno, durationObratno)}</div>
        </div>
        <div className='ticket__wrapper'>
          <div className='head'>В ПУТИ</div>
          <div className='content'>{getTimeFromMins(durationObratno)}</div>
        </div>
        <div className='ticket__wrapper'>
          <div className='head'>{wordOfNum(stopsObratno)}</div>
          <div className='content'>{stopsObratno.join(", ")}</div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  img: PropTypes.string,
  durationTuda: PropTypes.number.isRequired,
  durationObratno: PropTypes.number.isRequired,
  dateTuda: PropTypes.string.isRequired,
  dateObratno: PropTypes.string.isRequired,
  stopsTuda: PropTypes.arrayOf(PropTypes.string).isRequired,
  stopsObratno: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Ticket.defaultProps = {
  img: null,
};