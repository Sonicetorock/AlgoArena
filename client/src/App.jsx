import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AccountProfilePage from './pages/AccountProfilePage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const HomeLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const UserLayout = () => (
  <>
    <Navbar role="user"/>
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
    <Navbar role="admin"/>
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* Home routes (unauthenticated) */}
      <Route element={<HomeLayout />}>
        <Route index element={<HomePage />} />
         {/*see protect route comp*/}
        <Route path="login" element={
          <ProtectedRoute authenticationReq={false} toWhere="/user/dashboard">
            <LoginPage />
          </ProtectedRoute>  } />
        <Route path="register" element={
          <ProtectedRoute authenticationReq={false} toWhere="/user/dashboard">
            <RegisterPage />
          </ProtectedRoute>
        } />
      </Route>

      {/* User routes */}
      <Route path="user" element={
        <ProtectedRoute authenticationReq={true} role="user">
          <UserLayout />
        </ProtectedRoute>}>
        <Route index path="dashboard" element={<UserDashboardPage />} />
        <Route path="account" element={<AccountProfilePage />} />
      </Route>
      {/* Admin routes */}
      <Route path="adminDashboard" element={
        <ProtectedRoute authenticationReq={true} role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboardPage />} />
        
      </Route>

      {/* Others*/}
      <Route path="*" element={<><Navbar/><NotFound /></>} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;