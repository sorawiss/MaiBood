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

import Login from './pages/Login';
import Layout from './coponents/layout';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>

          <Route path='/' element={<Navigate to='/home' replace />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/fridge" element={<ProtectedRoute><Fridge /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><Add /></ProtectedRoute>} />
            <Route path="/fridge/add-to-fridge" element={<ProtectedRoute><AddtoFridge /></ProtectedRoute>} />
            <Route path="/inpost" element={<ProtectedRoute><Inpost /></ProtectedRoute>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
