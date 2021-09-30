import './App.css';
import Search from './Search';
import Results from './Results'
import {React, useState} from 'react';

function App() {

  const [data, updateData] = useState([]);

  return (
    <div className="App">
      <Search updateData = {updateData}/>
      <Results data = {data}/>
    </div>
  );
}

export default App;
