import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Climbs from './pages/Climbs';
import Analysis from './pages/Analysis';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className='content'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/climbs' element={<Climbs />} />
        <Route path='/analysis' element={<Analysis />} />
      </Routes>
    </div>
  );
};
