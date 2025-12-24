import Login from './components/Login';
import ChallengeCard from './components/ChallengeCard';
import ProgressBar from './components/ProgressBar';
import CompletedList from './components/CompletedList';
import SongRequest from './components/SongRequest';
import { useGuests } from './hooks/useGuests';
import './App.css';

function App() {
  const { 
    currentUser, 
    completedGuests,
    completionPercentage, 
    error, 
    isLoading, 
    login, 
    completeChallenge, 
    rejectChallenge,
    songRequests,
    addSongRequest
  } = useGuests();

  if (isLoading) {
    return <div className="app-container"><p>Cargando invitados...</p></div>;
  }

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login onLogin={login} error={error} />
      ) : (
        <>
          <ChallengeCard 
            guest={currentUser} 
            onComplete={completeChallenge}
            onReject={rejectChallenge}
          />
          <CompletedList completedGuests={completedGuests} />
          <SongRequest 
            requests={songRequests} 
            onAddRequest={addSongRequest} 
            currentUser={currentUser} 
          />
        </>
      )}
      
      <ProgressBar percentage={completionPercentage} />
    </div>
  );
}

export default App;
