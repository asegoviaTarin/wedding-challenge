import { useState, useEffect, useMemo } from 'react';
import { ref, onValue, set, update, push } from 'firebase/database';
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

  const completedGuests = useMemo(() => {
    return guestsData
      .filter(g => g.completed)
      .sort((a, b) => {
        // Sort by time, oldest first (first to finish)
        const dateA = a.completedAt ? new Date(a.completedAt) : new Date(0);
        const dateB = b.completedAt ? new Date(b.completedAt) : new Date(0);
        return dateA - dateB;
      });
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
      update(guestRef, {
        completed: true,
        completedAt: new Date().toISOString()
      });
    }
  };

  const rejectChallenge = () => {
    setUserPhone(null);
    localStorage.removeItem('weddingUserPhone');
    setError('');
  };

  // Song Requests Logic
  const [songRequests, setSongRequests] = useState([]);

  useEffect(() => {
    const requestsRef = ref(database, 'requests');
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSongRequests(Object.values(data));
      } else {
        setSongRequests([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addSongRequest = (songName, requesterName) => {
    const newRequestRef = push(ref(database, 'requests'));
    set(newRequestRef, {
      song: songName,
      requester: requesterName,
      timestamp: new Date().toISOString()
    });
  };

  return {
    guestsData,
    currentUser,
    completedGuests,
    completionPercentage,
    userPhone,
    error,
    isLoading,
    login,
    completeChallenge,
    rejectChallenge,
    songRequests,
    addSongRequest
  };
}
