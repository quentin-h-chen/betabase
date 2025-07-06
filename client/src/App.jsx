import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Climbs from './pages/Climbs';
import Analysis from './pages/Analysis';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddClimb from './pages/AddClimb';
import { useState } from 'react';

export default function App() {
  const [climbs, setClimbs] = useState([]);

  const handleAddClimb = (newClimb) => {
    setClimbs((prev) => [...prev, newClimb]);
  };

  return (
    <div className='content'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/climbs' element={<Climbs climbs={climbs} setClimbs={setClimbs} />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-climb' element={<AddClimb onAddClimb={handleAddClimb} />} />
      </Routes>
    </div>
  );
};
