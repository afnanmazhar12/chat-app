import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      console.log('Logout Response Status:', res.status);
      const data = await res.json();
      console.log('Logout Response Data:', data);

      // Check for successful response (don't treat "logged out successfully" as an error)
      if (!res.ok || data.error === 'logged out successfully') {
        if (data.error === 'logged out successfully') {
          // If the logout was successful, clear localStorage and reset authUser
          localStorage.removeItem("chat-user");
          setAuthUser(null);
          toast.success("Logged out successfully!");
        } else {
          // If there's another error message, throw an error
          throw new Error(data.error || "Unknown logout error");
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
