import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { ToastContainer } from 'react-toastify';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddBlog from './pages/AddBlog'
import AlertComponent from './components/AlertComponent';


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <AlertComponent/>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user && (user.email && user.token) ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!(user && (user.email && user.token)) ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!(user && (user.email && user.token)) ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/addBlog"
              element={ 
                //  user && (user.email && user.token) ?
                <AddBlog /> 
                // : <Navigate to="/" />
               }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
