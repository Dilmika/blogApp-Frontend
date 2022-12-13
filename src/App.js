import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user && (user.email && user.token) ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!(user &&(user.email && user.token)) ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!(user && (user.email && user.token)) ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
