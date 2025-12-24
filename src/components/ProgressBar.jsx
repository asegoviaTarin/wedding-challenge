export default function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span>% de retos completados</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
