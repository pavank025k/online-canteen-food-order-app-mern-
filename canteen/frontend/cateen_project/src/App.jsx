import { Navigate, Route, Routes } from "react-router-dom";

import { Loader } from "lucide-react";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Menu from "./3pages/menuitem/Menu";

import SignUpPage from "./Authpages/SignUpPage";
import LoginPage from "./Authpages/LoginPage";
import Total from "./3pages/totalpage/Total";
import Adminlogin from "./Authpages/Adminlogin";

import Welcom from "./3pages/welcomepage/Welcom";
import Admindashboard from "./3pages/admindashboard/Admindashboard";
import OrderHistory from "./3pages/totalpage/OrderHistory";

function App() {
  const { authUser, checkAuth, isCheckingAuth, adminUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  console.log({ authUser });
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcom />} />
        <Route
          path="/user/userdashboard"
          element={authUser ? <Menu /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/admindashboard"
          element={adminUser ? <Admindashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/login"
          element={
            !adminUser ? (
              <Adminlogin />
            ) : (
              <Navigate to="/admin/admindashboard" />
            )
          }
        />
        <Route
          path="/user/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/user/userdashboard" />
          }
        />
        <Route
          path="/user/signup"
          element={
            !authUser ? <SignUpPage /> : <Navigate to="/user/userdashboard" />
          }
        />
        <Route
          path="/total"
          element={authUser ? <Total /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/history"
          element={authUser ? <OrderHistory /> : <Navigate to="/user/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
