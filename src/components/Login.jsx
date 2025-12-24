import { useState } from 'react';

export default function Login({ onLogin, error }) {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length > 5) {
      onLogin(phone);
    }
  };

  return (
    <div className="container">
      <h1>¡Bienvenido a la Boda!</h1>
      
      <img 
        src="/wedding-challenge/wedding_header_illustration_v2.png" 
        alt="Wedding Decoration" 
        style={{ 
          width: '100%', 
          maxWidth: '300px',
          height: 'auto',
          borderRadius: '12px',
          margin: '16px auto',
          display: 'block'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none'; // Hide if fails to load
        }}
      />

      <p>Introduce tu teléfono para descubrir tu misión secreta.</p>
      
      <form onSubmit={handleSubmit} className="card">
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="tel"
            placeholder="600000000"
            value={phone}
            maxLength={9}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        {error && <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{error}</p>}
        
        <button type="submit">
          Ver mi Reto 🕵️‍♂️
        </button>
      </form>
    </div>
  );
}
