import React from "react";
import authApi from "../api/auth";

const HomeMain = () => {
    authApi.get('/home')
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