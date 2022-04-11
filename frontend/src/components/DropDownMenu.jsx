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
            <div id="show-home-link">
                <div className="home-title"><NavLink to={ "/home" } className="nav-link">
                    Accueil
                </NavLink></div>
                <i className="fas fa-home"></i>
            </div>
            <div className="comment-splitter"></div>
            <div id="show-profile-link">
                <div className="profile-title"><NavLink to={ `/profil/${ localStorage.getItem("userId") }` } className="nav-link">
                    Mon profil
                </NavLink></div>
                <i className="far fa-user"></i>
            </div>
            <button type="button" id="logout-btn" onClick={ logOut }>
                <div className="logout-btn-title">Déconnexion</div>
                <i className="fas fa-power-off"></i>
            </button>
        </div>
      )
}