import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
        <Route path='/login' exact element={ <LogIn /> } />
        <Route path='/' exact element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
