import React,{useState} from 'react';
import './CSS/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import Edit_Profile from './Pages/Edit_profile';
import Forget_Password from './Pages/Forget_password';
import Reset_Password from './Pages/Reset_password';

function App() {
  const Routing = ()=>{
    return(
      <Router>
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='login' element={<Login />} />
          <Route exact path='dashboard' element={<Dashboard />} />
          <Route exact path='profile' element={<Profile />} />
          <Route exact path='edit_profile' element={<Edit_Profile />} />
          <Route exact path='forget_password' element={<Forget_Password />} />
          <Route exact path='reset_password/:token' element={<Reset_Password />} />
          <Route exact path='logout' element={<Logout />} />
        </Routes>
      </Router>
    )
  }
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
