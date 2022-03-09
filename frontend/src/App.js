import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
        <Route path='/login' exact element={ <LogIn /> } />
        <Route path='/' exact element={ <Home /> } />
        <Route path='/profile/:id' exact element={ <Profile /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
