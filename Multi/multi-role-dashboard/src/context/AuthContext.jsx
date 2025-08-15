import { createContext, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      const role = email.includes("admin") ? "admin" : "user";
      setUser({ token: data.token, role, email });
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
