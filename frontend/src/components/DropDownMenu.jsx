import React from 'react';
import { NavLink } from "react-router-dom";

export default function DropDownMenu() {

    const logOut = (e) => {
        e.preventDefault();
        localStorage.clear();

        return window.location.reload(false);
    }

    return (
        <div id="dropdown-menu">
            <NavLink to={ "/home" } id="show-home-link" className="nav-link">
                <div className="home-title">
                    Accueil
                </div>
                <i className="fas fa-home"></i>
            </NavLink>
            <NavLink to={ `/profil/${ localStorage.getItem("userId") }` } id="show-profile-link" className="nav-link">
                <div className="profile-title">
                    Mon profil
                </div>
                <i className="far fa-user"></i>
            </NavLink>
            <button type="button" id="logout-btn" onClick={ logOut }>
                <div className="logout-btn-title">Déconnexion</div>
                <i className="fas fa-power-off"></i>
            </button>
        </div>
      )
}
