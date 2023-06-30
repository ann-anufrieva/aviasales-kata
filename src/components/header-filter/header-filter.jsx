import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { sortTicketByPrice, sortTicketByCheap } from "../../store/slicer/ticket-slice";

import './header-filter.css';

const HeaderFilter = () => {
  const [cheapTabActive, setCheapTabActive] = useState(false);
  const [fastTabActive, setFastTabActive] = useState(false);

  const dispatch = useDispatch();

  let classCheap = 'btn_sort';
  if (cheapTabActive) {
    classCheap = 'btn_sort--active';
  } else classCheap = 'btn_sort';

  let classFast = 'btn_sort';
  if (fastTabActive) {
    classFast = 'btn_sort--active';
  } else classFast = 'btn_sort';

  return (
    <div className='buttons'>
      <div className='buttons_wrapper'>
      <button
      type="button"
      className='btn_sort'
      onClick={() => {
        setFastTabActive(false);
        setCheapTabActive(true);
        dispatch(sortTicketByPrice());
      }}
    >
      Самый дешевый
    </button>
    <button
      type="button"
      className='btn_sort'
      onClick={() => {
        setCheapTabActive(false);
        setFastTabActive(true);
        dispatch(sortTicketByCheap());
      }}
    >
      Самый быстрый
    </button>
    <button
      type="button"
      className='btn_sort'
    >
      Оптимальный
    </button>
      </div>
  </div>

  );
};

export default HeaderFilter;