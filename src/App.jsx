import React, { useState } from 'react';
import './App.css'
import useDebounce from './hooks/useDebounce';
import DataTable from './components/DataTable';

function App() {
  const initialData = [
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Bob', age: 30, city: 'Los Angeles' },
    { name: 'Charlie', age: 22, city: 'Chicago' },
    { name: 'Diana', age: 28, city: 'Houston' },
  ];

  const [showText, setShowText] = useState(false);

  const debouncedShowText = useDebounce(showText, 1000);

  return (
    <>
      <div>Hello Test</div>
      <button onClick={() => setShowText(true)}>Show Hello World</button>
      {debouncedShowText && <div>Hello World</div>}
      <DataTable initialData={initialData} />
    </>
  )
}

export default App
