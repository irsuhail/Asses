export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>You are logged in.</p>
      <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}>
        Logout
      </button>
    </div>
  );
}
