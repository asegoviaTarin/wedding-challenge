import { useState, useEffect, useMemo } from 'react';
import Login from './components/Login';
import ChallengeCard from './components/ChallengeCard';
import ProgressBar from './components/ProgressBar';
import { ref, onValue, set, update } from 'firebase/database';
import { database } from './firebase';
import { guests } from './data/mockGuests';
import './App.css';

function App() {
  const [userPhone, setUserPhone] = useState(localStorage.getItem('weddingUserPhone'));
  const [guestsData, setGuestsData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sync with Firebase
  useEffect(() => {
    const guestsRef = ref(database, 'guests');
    const unsubscribe = onValue(guestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object back to array if needed, or keep as is if stored as array
        const guestsArray = Array.isArray(data) ? data : Object.values(data);
        setGuestsData(guestsArray);
      } else {
        // Initial seed if empty
        const guestsRef = ref(database, 'guests');
        // We need to convert array to object for easier Firebase handling or just save array
        // Saving as array for simplicity to match current structure
        set(guestsRef, guests); 
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentUser = useMemo(() => {
    return guestsData.find(g => g.phone === userPhone);
  }, [guestsData, userPhone]);

  const completionPercentage = useMemo(() => {
    if (guestsData.length === 0) return 0;
    const completed = guestsData.filter(g => g.completed).length;
    return Math.round((completed / guestsData.length) * 100);
  }, [guestsData]);

  const handleLogin = (phone) => {
    const guest = guestsData.find(g => g.phone === phone);
    if (guest) {
      setUserPhone(phone);
      localStorage.setItem('weddingUserPhone', phone);
      setError('');
    } else {
      setError('⚠️ Teléfono no encontrado en la lista de invitados.');
    }
  };

  const handleCompleteChallenge = () => {
    // Find index of current user to update specific node
    // Note: This relies on the order being preserved. For more robustness we should use IDs.
    // But for this quick migration, finding index is okay if we write back the whole array or find the specific key.
    
    const guestIndex = guestsData.findIndex(g => g.phone === userPhone);
    if (guestIndex > -1) {
      const guestRef = ref(database, `guests/${guestIndex}`);
      update(guestRef, { completed: true });
    }
  };

  const handleReject = () => {
    setUserPhone(null);
    localStorage.removeItem('weddingUserPhone');
    setError('');
  };

  if (isLoading) {
    return <div className="app-container"><p>Cargando invitados...</p></div>;
  }

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login onLogin={handleLogin} error={error} />
      ) : (
        <ChallengeCard 
          guest={currentUser} 
          onComplete={handleCompleteChallenge}
          onReject={handleReject}
        />
      )}
      
      <ProgressBar percentage={completionPercentage} />
    </div>
  );
}

export default App;
