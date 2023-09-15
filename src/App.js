import './App.css';
import Search from './component/Search'
import { Routes, Route } from 'react-router-dom';
import FlagInfo from './component/FlagInfo';
import NavBar from './component/NavBar';
import AllFlags from './component/AllFlags';

function App() {
  return (
    <div className="App ">
      <div className='relative z-[1]'>
        <NavBar />
      </div>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/flagInfo' element={<FlagInfo />} />
        <Route path='/allFlags' element={<AllFlags />} />
      </Routes>

    </div>
  );
}

export default App;
