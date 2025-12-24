import Login from './components/Login';
import ChallengeCard from './components/ChallengeCard';
import ProgressBar from './components/ProgressBar';
import { useGuests } from './hooks/useGuests';
import './App.css';

function App() {
  const { 
    currentUser, 
    completionPercentage, 
    error, 
    isLoading, 
    login, 
    completeChallenge, 
    rejectChallenge 
  } = useGuests();

  if (isLoading) {
    return <div className="app-container"><p>Cargando invitados...</p></div>;
  }

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login onLogin={login} error={error} />
      ) : (
        <ChallengeCard 
          guest={currentUser} 
          onComplete={completeChallenge}
          onReject={rejectChallenge}
        />
      )}
      
      <ProgressBar percentage={completionPercentage} />
    </div>
  );
}

export default App;
