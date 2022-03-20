import React from "react";

const Banner = () => {
    const urlPathName = (new URL(document.location)).pathname;

    if (urlPathName === "/" || urlPathName === "/signup") {

        return (
            <div className="banner-loggedoff">
                <img src="./assets/man-woman-looking(large).jpg" alt="banner" />
            </div>
        );
    } else {

        return (
            <div className="banner-home">
                <img src="./assets/group-people-sharing(large).jpg" alt="banner" />
            </div>
            );
    }
};

export default Banner;