import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import ProfilePage from './pages/Profile';
import NotFound from "./pages/NotFound";

import PrivateRoute from "./PrivateRoute";


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/signup' exact element={ <SignUp /> } />
        <Route path='/' exact element={ <LogIn /> } />
        <Route element={ <PrivateRoute /> }>
          <Route path='/home' exact element={ <HomePage /> } />
          <Route path='/profil/:id' exact element={ <ProfilePage /> } />
          <Route path='*' element={ <NotFound /> } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;