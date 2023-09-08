import './App.css';
import Search from './component/Search'
import { Routes, Route } from 'react-router-dom';
import FlagInfo from './component/FlagInfo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Search/>} />
        <Route path='/flagInfo' element={<FlagInfo/>} />
      </Routes>
      
    </div>
  );
}

export default App;
