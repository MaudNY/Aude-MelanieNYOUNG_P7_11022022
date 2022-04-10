import React from "react";
import { Link } from "react-router-dom";

import DropDownMenu from "../components/DropDownMenu";

export default function Header() {
    const urlPathName = (new URL(document.location)).pathname;

    if (urlPathName === "/" || urlPathName === "/signup") {

        return (
            <header>
                <div className="header-logo">
                    <img src="./assets/logo-inbetween.png" alt="logo" />
                </div>
            </header>
        )
    } else {

        return (
            <header>
                <Link to={ '/home' }>
                    <div className="header-logo logo-pointer">
                        <img src="../assets/logo-inbetween.png" alt="logo" />
                    </div>
                </Link>
                <div className="header-profile-link">
                    <div className="header-profile-pic">
                        <img src={ localStorage.getItem("profileImageUrl") } alt="utilisateur connecté" />
                    </div>
                    <DropDownMenu />
                </div>
            </header>
            )
    }
};