import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ChallengeCard({ guest, onComplete, onReject }) {
  const [showRejectModal, setShowRejectModal] = useState(false);

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
        
        {!guest.completed && (
          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>
              📸 Sube tu evidencia:
            </label>
            <input 
              type="file" 
              accept="image/*"
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--color-bg)',
                borderRadius: '8px',
                border: '1px dashed var(--color-secondary)'
              }}
            />
          </div>
        )}
      </div>

      {!guest.completed ? (
        <>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
            📸 <b>Nota:</b> Si tu reto implica foto o vídeo, mándaselo a los novios por WhatsApp para validarlo.
          </p>
          <button onClick={handleComplete} className="success">
            ¡Lo he conseguido! ✅
          </button>
          <button 
            onClick={() => setShowRejectModal(true)} 
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

      {/* Reject Modal */}
      {showRejectModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--color-bg)',
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            maxWidth: '320px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>😢</div>
            <h3 style={{ color: 'var(--color-text)', marginBottom: '10px' }}>Vaya...</h3>
            <p style={{ color: 'var(--color-secondary)', fontSize: '1.1rem', marginBottom: '24px', lineHeight: '1.5' }}>
              No esperábamos esto de ti. Confiábamos en que serías el alma de la fiesta.
            </p>
            <button 
              onClick={onReject}
              style={{ 
                backgroundColor: 'var(--color-secondary)', 
                color: 'white',
                width: '100%' 
              }}
            >
              Volver al inicio
            </button>
          </div>
          <style>{`
            @keyframes popIn {
              from { transform: scale(0.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
