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
import { db, auth } from './firebase/firebaseConfig';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [climbs, setClimbs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const climbsQuery = query(
              collection(db, "climbs"),
              where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(climbsQuery);
            const climbsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
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
      setClimbs((prev) => [...prev, newClimb]);
    };

  return (
    <div className='content'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/climbs' element={<Climbs climbs={climbs} setClimbs={setClimbs} />} />
        <Route path='/analysis' element={<Analysis climbs={climbs} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-climb' element={<AddClimb onAddClimb={handleAddClimb} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
};
