import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { authStore } from './context/auth';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/login';
import { Bounce, ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './routes/protected';
import { Profile } from './pages/profile';
import { Processes } from './pages/process';


function App() { 
  // const auth: authState = authStore.getState();
  const auth = authStore((state) => state.auth);
  // console.log(auth);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/processes" element={<Processes />}/>
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
        limit= {4}
        theme="light"
        transition={Bounce}
        pauseOnFocusLoss
        draggable
        pauseOnHover
     />
    </>
  )
}

export default App
