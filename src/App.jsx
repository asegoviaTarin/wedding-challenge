import Login from './components/Login';
import ChallengeCard from './components/ChallengeCard';
import ProgressBar from './components/ProgressBar';
import CompletedList from './components/CompletedList';
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
        <>
          <ChallengeCard 
            guest={currentUser} 
            onComplete={completeChallenge}
            onReject={rejectChallenge}
          />
          <CompletedList completedGuests={completedGuests} />
        </>
      )}
      
      <ProgressBar percentage={completionPercentage} />
    </div>
  );
}

export default App;
