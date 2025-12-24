import confetti from 'canvas-confetti';

export default function ChallengeCard({ guest, onComplete, onReject }) {
  const handleComplete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onComplete();
  };

  return (
    <div className="container">
      <h2>Hola, {guest.name} 👋</h2>
      <div className="card">
        <h3>Tu Misión:</h3>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
          {guest.challenge}
        </p>
      </div>

      {!guest.completed ? (
        <>
          <button onClick={handleComplete} className="success">
            ¡Lo he conseguido! ✅
          </button>
          <button 
            onClick={onReject} 
            className="secondary" 
            style={{ marginTop: '12px' }}
          >
            Rechazar Desafío ❌
          </button>
        </>
      ) : (
        <>
          <div className="card completed">
            <h3>¡Misión Cumplida! 🎉</h3>
            <p>Has aportado tu granito de arena a la fiesta.</p>
          </div>
          <button 
            onClick={onReject} 
            className="btn-text" 
            style={{ marginTop: '12px' }}
          >
            Volver / Salir
          </button>
        </>
      )}
    </div>
  );
}
