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
import Assign from './Pages/Assign';
import Archives from './Pages/Archives';
import Home from './Pages/Home';
import Call from './Pages/Call';
import Author from './Pages/Author';
import Cissue from './Pages/Cissue';
import Volume from './Pages/Volume';
import S_a from './Pages/S_a';

function App() {
  const Routing = ()=>{
    return(
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/register/offc' element={<S_a />} />
          <Route exact path='login' element={<Login />} />
          <Route exact path='dashboard' element={<Dashboard />} />
          <Route exact path='profile' element={<Profile />} />
          <Route exact path='edit_profile' element={<Edit_Profile />} />
          <Route exact path='forget_password' element={<Forget_Password />} />
          <Route exact path='reset_password/:token' element={<Reset_Password />} />
          <Route exact path='reset_password/:token' element={<Reset_Password />} />
          <Route exact path='dashboard/view' element={<Assign />} />        
          <Route exact path='archives' element={<Archives />} />          
          <Route exact path='call_for_paper' element={<Call />} />         
          <Route exact path='author_instructions' element={<Author />} />  
          <Route exact path='current_issues' element={<Cissue />} />    
          <Route exact path='archives/volume' element={<Volume />} />  
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
