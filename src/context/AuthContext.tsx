import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define basic auth types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  // Fix: Update register function to accept password parameter
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app, this would call an API
    if (email === "test@example.com" && password === "password") {
      setUser({
        id: "1",
        name: "Test User",
        email: "test@example.com",
      });
      return true;
    }
    return false;
  };

  // Fix: Use the password parameter
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Mock registration - in a real app, this would call an API
    if (email === "test@example.com") {
      return false; // Email already in use
    }

    // Use password (e.g., for validation)
    if (password.length < 6) {
      return false; // Password too short
    }

    setUser({
      id: Math.random().toString(36).slice(2, 11),
      name,
      email,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
