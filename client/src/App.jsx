import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Import
import Home from './pages/Home';
import Nav from './coponents/Nav';
import Fridge from './pages/Fridge';
import Profile from './pages/Profile';
import Add from './coponents/Add'


function App() {
  return (
    <Router>

      <div className="App flex flex-col items-center w-[23.5rem] mx-auto min-h-screen relative pb-[5rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Home />} />
          <Route path='/add' element={<Add />} />

        </Routes>
      </div>
      <Nav />

    </Router>
  );
}

export default App;
