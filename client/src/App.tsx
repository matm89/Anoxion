import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { Bounce, ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './routes/protected';
import ProfilePage from './pages/ProfilePage';
import ProcessesPage from './pages/ProcessPage';
import { MainLayout } from './layout/MainLayout';
import { useEffect } from 'react';
import { useThemeStore } from './context/theme';

function App() {
  const { mode } = useThemeStore();

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/processes" element={<ProcessesPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        limit={4}
        theme={mode === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
