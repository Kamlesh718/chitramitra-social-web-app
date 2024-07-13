import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/profile/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
