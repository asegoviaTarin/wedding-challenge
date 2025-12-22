export default function ProgressBar({ percentage }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      padding: '10px 20px',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontWeight: 'bold' }}>% de retos completados</span>
        <span>{percentage}%</span>
      </div>
      <div style={{
        width: '100%',
        height: '10px',
        backgroundColor: '#eee',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: 'var(--color-secondary)',
          transition: 'width 0.5s ease-out'
        }} />
      </div>
    </div>
  );
}
