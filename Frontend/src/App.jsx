import React from 'react';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* <Route exact path="/forgot" element={<ForgotPassword />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
