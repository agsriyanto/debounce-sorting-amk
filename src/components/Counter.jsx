// Counter.js

import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CounterContext } from './Context/CounterContext';

const Counter = () => {
  const store = useContext(CounterContext);
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default Counter;
