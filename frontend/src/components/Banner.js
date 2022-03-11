import React from "react";

const Banner = () => {
    const urlPathName = (new URL(document.location)).pathname;

    if (urlPathName === "/") {

        return (
        <div className="banner-home">
            <img src="./img/group-people-sharing(large).jpg" alt="banner" />
        </div>
        );
    } else if (urlPathName === "/signup" || urlPathName === "/login") {

        return (
            <div className="banner-logoff">
                <img src="./img/man-woman-looking(large).jpg" alt="banner" />
            </div>
        );
    }
};

export default Banner;