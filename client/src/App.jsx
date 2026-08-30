import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Climbs from './pages/Climbs';
import Analysis from './pages/Analysis';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddClimb from './pages/AddClimb';
import { useEffect, useState } from 'react';
import About from './pages/About';
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [climbs, setClimbs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try { 
            const token = await user.getIdToken();
            const response = await fetch('http://localhost:3000/api/climbs', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
        
            // Check if BFF returned error
            if (!response.ok) {
              throw new Error('Failed to fetch climbs');
            }

            // Convert BFF's json response into JS
            const climbsData = await response.json();

            // Store climbs in React state
            setClimbs(climbsData);

          } catch (error) {
            console.error("Error fetching climbs:", error);
            setClimbs([]);
          }
        
        } else {
          setClimbs([]);
        }
      });

      return () => unsubscribe(); 
  }, []);

  const handleAddClimb = (newClimb) => {
      setClimbs((prev) => [newClimb, ...prev]);
    };

  return (
    <div className='content'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/climbs' element={<Climbs climbs={climbs} setClimbs={setClimbs} />} />
        <Route path='/analytics' element={<Analysis climbs={climbs} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-climb' element={<AddClimb onAddClimb={handleAddClimb} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
};
