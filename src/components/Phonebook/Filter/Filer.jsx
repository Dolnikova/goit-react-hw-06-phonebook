import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiler, onFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFiler);
  const handleFilter = e => {
    dispatch(onFilter(e.target.value));
  };
  return (
    <div className="FilterWrapper">
      Find contact by name
      <form action="">
        <label htmlFor="">
          <input
            type="text"
            name="filter"
            value={filter}
            onChange={handleFilter}
          />
        </label>
      </form>
    </div>
  );
};
export default Filter;
