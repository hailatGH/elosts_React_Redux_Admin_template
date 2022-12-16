export default function AnalyticsCard(props) {
  return (
    <div className="card">
      <div className="card-icon" style={{ background: props.iconbgcolor }}>
        <i className={props.icon}></i>
      </div>
      <div
        className="card-content"
        style={{ background: props.contentbgcolor }}
      >
        <div className="card-count">{props.count}</div>
        <div className="card-name">{props.name}</div>
      </div>
    </div>
  );
}
