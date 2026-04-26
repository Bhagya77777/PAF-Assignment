import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Facilities from './pages/facilities/Facilities';
import Bookings from './pages/bookings/Bookings';
import Incidents from './pages/incidents/Incidents';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import './App.css';

const GOOGLE_CLIENT_ID = "424522361465-j5baejvuhbql4mh6nqcoj5i6eh354014.apps.googleusercontent.com";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ToastProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="incidents" element={<Incidents />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ToastProvider>
  );
}

export default App;
