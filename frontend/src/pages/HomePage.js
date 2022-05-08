import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUserData } from "../feature/user.slice";

import authApi from '../api/auth';

import Header from "../components/Header";
import Banner from "../components/Banner";
import HomeFeed from "../components/HomeFeed";
import Footer from "../components/Footer";

const HomePage = () => {
    // Variables
    const dispatch = useDispatch();

    const resetPostOptions = (e) => {
        const $clickedElement = document.querySelector(".clicked");

        if ($clickedElement && !e.target.classList.contains("post-actions-icon")) {
            $clickedElement.classList.remove("clicked");
        }
    }

    // SET CURRENT USER IN REDUX STORE
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        authApi.get(`/profile/${userId}`)
            .then(res => {

                return dispatch(setCurrentUserData({
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    role: res.data.role,
                    profileImageUrl: res.data.profileImageUrl
                }));
            })
            .catch(error => {
                    
                console.log(error);
            })

    }, [dispatch]);
       
    return (
        <div onClick={ resetPostOptions }>
            <Header />
            <Banner />
            <HomeFeed />
            <Footer />
        </div>
    )
}

export default HomePage;