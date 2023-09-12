import './App.css';
import Search from './component/Search'
import { Routes, Route } from 'react-router-dom';
import FlagInfo from './component/FlagInfo';
import NavBar from './component/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Search/>} />
        <Route path='/flagInfo' element={<FlagInfo/>} />
      </Routes>
      
    </div>
  );
}

export default App;
