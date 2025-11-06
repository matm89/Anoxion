import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { authStore } from './context/auth';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/login';


function App() { 
  // const auth: authState = authStore.getState();
  const auth = authStore((state) => state.auth);
  console.log(auth);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth? <Dashboard/> : <Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
