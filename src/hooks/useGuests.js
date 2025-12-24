import { useState, useEffect, useMemo } from 'react';
import { ref, onValue, set, update } from 'firebase/database';
import { database } from '../firebase';
import { guests } from '../data/mockGuests';

export function useGuests() {
  const [userPhone, setUserPhone] = useState(() => localStorage.getItem('weddingUserPhone'));
  const [guestsData, setGuestsData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sync with Firebase
  useEffect(() => {
    const guestsRef = ref(database, 'guests');
    const unsubscribe = onValue(guestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const guestsArray = Array.isArray(data) ? data : Object.values(data);
        setGuestsData(guestsArray);
      } else {
        // Initial seed if empty
        set(ref(database, 'guests'), guests);
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

  const login = (phone) => {
    const guest = guestsData.find(g => g.phone === phone);
    if (guest) {
      setUserPhone(phone);
      localStorage.setItem('weddingUserPhone', phone);
      setError('');
    } else {
      setError('⚠️ Teléfono no encontrado en la lista de invitados.');
    }
  };

  const completeChallenge = () => {
    const guestIndex = guestsData.findIndex(g => g.phone === userPhone);
    if (guestIndex > -1) {
      const guestRef = ref(database, `guests/${guestIndex}`);
      update(guestRef, { completed: true });
    }
  };

  const rejectChallenge = () => {
    setUserPhone(null);
    localStorage.removeItem('weddingUserPhone');
    setError('');
  };

  return {
    guestsData,
    currentUser,
    completionPercentage,
    userPhone,
    error,
    isLoading,
    login,
    completeChallenge,
    rejectChallenge
  };
}
