import React from "react";
import { NavLink } from "react-router-dom";

const NavigationLoginPage = () => {
    return (
        <nav id="navigation-login-page">
            <div id="buttons-row">
                <NavLink exact="true" to="/signup" id="signup-button" className="nav-active">
                    S'inscrire
                </NavLink>
                <div id="button-splitter"></div>
                <NavLink exact="true" to="/login" id="login-button" className="nav-active">
                    Se connecter
                </NavLink>
            </div>
        </nav>
    );
};

export default NavigationLoginPage;