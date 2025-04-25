import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Import
import Home from './pages/Home';
import Fridge from './pages/Fridge';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Add from './coponents/Add';
import AddtoFridge from './coponents/AddtoFridge';
import Layout from './coponents/layout';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<Add />} />
          <Route path="/addtofridge" element={<AddtoFridge />} />
          <Route path="*" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
