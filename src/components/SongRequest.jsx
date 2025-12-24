import { useState } from 'react';

export default function SongRequest({ requests, onAddRequest, currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [song, setSong] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song.trim()) {
      onAddRequest(song, currentUser.name);
      setSong('');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 90,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0
        }}
      >
        🎵
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }} onClick={() => setIsOpen(false)}>
          
          <div 
            style={{
              backgroundColor: 'white',
              width: '100%',
              maxWidth: '480px',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '24px',
              maxHeight: '80vh',
              overflowY: 'auto',
              animation: 'slideUp 0.3s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>🎵 Pide una canción</h3>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ width: 'auto', padding: '5px 10px', background: 'transparent', color: '#666', fontSize: '1.5rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Ej: Paquito el Chocolatero"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid #ddd',
                    fontSize: '1rem' 
                  }}
                />
                <button type="submit" style={{ width: 'auto', padding: '0 20px' }}>
                  Pedir
                </button>
              </div>
            </form>

            <h4 style={{ marginBottom: '12px', color: 'var(--color-secondary)' }}>Lista de deseos:</h4>
            {requests.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center' }}>Aún no hay peticiones. ¡Rompe el hielo! 🧊</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {requests.map((req, idx) => (
                  <div key={idx} style={{ 
                    padding: '10px', 
                    backgroundColor: 'var(--color-bg)', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      fontWeight: 600, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      flex: 1 
                    }}>
                      {req.song}
                    </span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: '#666', 
                      whiteSpace: 'nowrap', 
                      flexShrink: 0 
                    }}>
                      de {req.requester}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
