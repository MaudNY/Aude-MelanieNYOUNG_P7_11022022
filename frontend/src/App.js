import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
        <Route path='/' exact element={ <LogIn /> } />
        <Route path='/home' exact element={ <Home /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;