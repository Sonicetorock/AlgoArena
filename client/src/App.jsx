import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AccountProfilePage from "./pages/AccountProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PostProblemPage from "./pages/admin/PostProblemPage";
import EditProblemPage from "./pages/admin/EditProblemPage";
import ProblemPage from "./pages/user/ProblemPage";
import AllProblems from "./pages/admin/AllProblems";
import AllUsers from "./pages/admin/AllUsers";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";

const HomeLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const UserLayout = () => (
  <>
    <Navbar role="user" />
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
    <Navbar role="admin" />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Home routes (unauthenticated) */}

      {/*see protect route comp*/}
      <Route
        element={
          <ProtectedRoute authenticationReq={false} toWhere="/">
            <HomeLayout />{" "}
            {/*Layout is protected so no explicitly need of protectedRoutes for subroutes of this */}
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutUsPage />} />
      </Route>

      {/* User routes */}
      <Route
        path="user"
        element={
          <ProtectedRoute authenticationReq={true} role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index path="dashboard" element={<UserDashboardPage />} />
        <Route path="account" element={<AccountProfilePage />} />
        <Route path="problems/:id" element={<ProblemPage />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="admin"
        element={
          <ProtectedRoute authenticationReq={true} role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index path="dashboard" element={<AdminDashboardPage />} />
        <Route path="allproblems" element={<AllProblems />} />
        <Route path="account" element={<AccountProfilePage />} />
        <Route path="post-problem" element={<PostProblemPage />} />
        <Route path="edit-problem/:id" element={<EditProblemPage />} />
        <Route path="allusers" element={<AllUsers />} />
      </Route>

      {/* Others*/}
      <Route
        path="*"
        element={
          <>
            <Navbar />
            <NotFound />
          </>
        }
      />
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
