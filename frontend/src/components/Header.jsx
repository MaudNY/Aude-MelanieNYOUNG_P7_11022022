import React, { useState } from "react";
import { Link } from "react-router-dom";

import DropDownMenu from "../components/DropDownMenu";

export default function Header() {
    const [ dropdownMenu, setDropdownMenu ] = useState(false);
    const urlPathName = (new URL(document.location)).pathname;

    const showDropdownMenu = (e) => {
        e.preventDefault();

        return setDropdownMenu(!dropdownMenu);
    }

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
                <div className="header-profile-link" onClick={ showDropdownMenu }>
                    <div className="header-profile-pic">
                        <img src={ localStorage.getItem("profileImageUrl") } alt="utilisateur connecté" />
                    </div>
                    { dropdownMenu === true
                    ?
                    <DropDownMenu />
                    : <></>
                    }
                </div>
            </header>
            )
    }
};