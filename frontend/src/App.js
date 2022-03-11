import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
        <Route path='/login' exact element={ <LogIn /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
