import React from "react";
import api from "../api/url";

const HomeMain = () => {
    api.get('/')
        .then(res => {

            return console.log(res);
        })
        .catch(error => {
            console.log(error)
        })

    return (
        <main className="home-main">
            <div className="container-main">
                Hello !
            </div>
        </main>
    );
};

export default HomeMain;