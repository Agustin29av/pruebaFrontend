import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

export default function ProtectedRoute() {
  const token = useSelector((s) => s.auth?.token);
  
  const hasToken = token || localStorage.getItem("token");
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}