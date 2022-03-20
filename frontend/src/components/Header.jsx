import React from 'react'

export default function Header() {
    const urlPathName = (new URL(document.location)).pathname;

    if (urlPathName === "/" || urlPathName === "/signup" || urlPathName === "*") {

        return (
            <header>
                <div className="header-logo">
                    <img src="./assets/logo-inbetween.png" alt="logo" />
                </div>
            </header>
        );
    } else {

        return (
            <header>
                <div className="header-logo">
                    <img src="./assets/logo-inbetween.png" alt="logo" />
                </div>
                <div className="header-profile-link">
                    <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
                </div>
            </header>
            );
    }
};