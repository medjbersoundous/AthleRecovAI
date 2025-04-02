import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user, loading, initializeAuth } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Only initialize if we have a token but no user
      if (!user && localStorage.getItem('token')) {
        await initializeAuth();
      }
      setIsCheckingAuth(false);
    };
    
    checkAuth();
  }, [user, initializeAuth]);

  if (loading || isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Your loading spinner component */}
        <p>Checking authentication...</p>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;