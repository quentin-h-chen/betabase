import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Climbs from './pages/Climbs';
import Analysis from './pages/Analysis';

export default function App() {
  return (
    <div className='content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/climbs' element={<Climbs />} />
        <Route path='/analysis' element={<Analysis />} />
      </Routes>
    </div>
  );
};
