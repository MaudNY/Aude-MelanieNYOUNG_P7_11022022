import React from "react";

const Footer = () => {
    const urlPathName = (new URL(document.location)).pathname;

    if (urlPathName === "/" || urlPathName === "/signup") {

        return (
            <footer>
                <img src="./assets/icon-left-font-monochrome-black(small).png" alt="logo" />
            </footer>
        )
    } else {
        return (
            <footer>
                <img src="../assets/icon-left-font-monochrome-black(small).png" alt="logo" />
            </footer>
        )
    }
};

export default Footer;