import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Provider component for the AuthContext
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  // Load the user from localStorage when the app loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("chat-user"));
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
