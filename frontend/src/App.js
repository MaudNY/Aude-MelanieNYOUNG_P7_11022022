import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
        <Route path='/' exact element={ <LogIn /> } />
        <Route element={ <PrivateRoute /> }>
          <Route path='/home' exact element={ <HomePage /> } />
          <Route path='*' element={ <NotFound /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;