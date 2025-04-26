import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

// Pages Import
import Home from './pages/Home';
import Fridge from './pages/Fridge';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Add from './coponents/Add';
import AddtoFridge from './coponents/AddtoFridge';
import Layout from './coponents/layout';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/fridge" element={<ProtectedRoute><Fridge /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><Add /></ProtectedRoute>} />
            <Route path="/add-to-fridge" element={<ProtectedRoute><AddtoFridge /></ProtectedRoute>} />
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
