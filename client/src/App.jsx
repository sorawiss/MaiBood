import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Navigate } from 'react-router-dom';

// Pages Import
import Home from './pages/Home';
import Fridge from './pages/Fridge';
import Profile from './pages/Profile';

import Add from './coponents/Add'
import AddtoFridge from './coponents/AddtoFridge'
import Inpost from './coponents/Inpost'

import Login from './pages/Login.jsx';
import Layout from './coponents/Layout.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';


function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>

          <Route path='/' element={<Navigate to='/home' replace />} />

          <Route element={<Layout />}>
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/fridge" element={<Fridge />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add" element={<Add />} />
              <Route path="/fridge/add-to-fridge" element={<AddtoFridge />} />
            </Route>
            
            <Route path="/home" element={<Home />} />
            <Route path="/home/inpost/:id" element={<Inpost />} />
          </Route>
          {/* End layout */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
