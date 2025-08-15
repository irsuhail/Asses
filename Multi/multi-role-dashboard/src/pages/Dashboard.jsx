import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";
import NotificationBell from "../components/NotificationBell";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotification();

  return (
    <div style={{
      background: theme === "light" ? "#fff" : "#333",
      minHeight: "100vh",
      color: theme === "light" ? "#000" : "#fff",
      padding: "20px"
    }}>
      <h2>Welcome {user?.email}</h2>
      <p>Role: {user?.role}</p>

      <NotificationBell />
      <button onClick={() => addNotification("New alert at " + new Date().toLocaleTimeString())}>
        Add Notification
      </button>

      <br /><br />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
