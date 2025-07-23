import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // Initialize the socket connection when authUser is available
      const socketInstance = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });

      // Set the socket instance into state
      setSocket(socketInstance);

      // Listen for online users
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Clean up the socket connection when authUser changes or the component unmounts
      return () => {
        if (socketInstance) {
          socketInstance.close();
        }
        setSocket(null);
      };
    } else {
      // Close the socket connection if authUser is not available
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Runs when authUser changes

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
