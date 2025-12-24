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
