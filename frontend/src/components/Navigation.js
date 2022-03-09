import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/">
                <Logo />
            </NavLink>
            <NavLink exact to="/profile/:id" className="my-profile">
                MON PROFIL
            </NavLink>
        </div>
    );
};

export default Navigation;