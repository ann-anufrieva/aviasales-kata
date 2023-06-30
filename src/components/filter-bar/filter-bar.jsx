import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCheck, checkAll } from "../../store/slicer/ticket-slice";

import './filter-bar.css';

const FilterBar = () => {

  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const arrCheck = useSelector((state) => state.tickets.panel);
  const checkItem = (id) => {
    dispatch(toggleCheck(id));
  };
  const checkAllItems = () => {
    dispatch(checkAll(!active));
  };
  
  useEffect(() => {
    setActive(arrCheck.every((el) => el.isChecked === true));
  }, [arrCheck]);

  return (

    <div className="filter-box">
      <span className="filter-wrapper">
        <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
        <label className="custom-checkbox" key={4} htmlFor={4}>
          <input onChange={() => checkAllItems()} type="checkbox" id={4} checked={active}></input>
          <span>Все</span>
        </label>
        {arrCheck.map((el) => (
          <label key={el.id} className="custom-checkbox" htmlFor={el.id}>
            <input
              type="checkbox"
              onChange={() => checkItem(el.id)}
              id={el.id}
              checked={el.isChecked}
            />
            <span>{el.label}</span>
          </label>
        ))}
      </span>
    </div>
  );
};

export default FilterBar;