import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
