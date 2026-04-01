import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext(null);

// Simulated user database
const MOCK_USERS = [
  { id: "u1", email: "demo@shopeasy.com", password: "demo1234", name: "Alex Morgan" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("se_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email, password) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 700));
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Invalid email or password.");
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem("se_user", JSON.stringify(safeUser));
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("se_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
