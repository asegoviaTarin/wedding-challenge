export default function CompletedList({ completedGuests }) {
  if (completedGuests.length === 0) return null;

  return (
    <div className="card" style={{ marginTop: '24px' }}>
      <h3 style={{ marginBottom: '16px', borderBottom: '2px solid var(--color-bg)', paddingBottom: '12px' }}>
        🏆 Hall of Fame
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {completedGuests.map((guest, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '8px',
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎖️'}
              </span>
              <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>
                {guest.name}
              </span>
            </div>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>
              {guest.completedAt ? 
                new Date(guest.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                : '--:--'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
