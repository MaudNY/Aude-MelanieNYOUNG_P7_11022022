import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute (req, res) {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (token === null || userId === null || role === null) {

            return <Navigate to="/" />
        } else {

            return <Outlet />;
        }
      } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Erreur d'authentification, veuillez vous reconnecter" });

        return <Navigate to="/" />;
      }
};

export default PrivateRoute;
