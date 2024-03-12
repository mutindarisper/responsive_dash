import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { increment, decrement } from '../store/map/CounterSlice';

function MyComponent() {
  const counter = useSelector((state: RootState) => state.value);
  const dispatch: AppDispatch = useDispatch();
  const [incrementValue, setIncrementValue] = useState<number>(1);

  const handleIncrement = () => {
    dispatch(increment(incrementValue));
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <input
        type="number"
        value={incrementValue}
        onChange={(e) => setIncrementValue(parseInt(e.target.value))}
      />
      <button onClick={handleIncrement}>Increment by Value</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default MyComponent;
