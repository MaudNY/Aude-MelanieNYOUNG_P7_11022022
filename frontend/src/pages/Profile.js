import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCurrentUserData } from "../feature/user.slice";

import authApi from '../api/auth';

import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import Footer from "../components/Footer";

const ProfilePage = () => {
    // Variables
    const { id } = useParams();
    const dispatch = useDispatch();

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
        <div>
            <Header />
            <ProfileInfo />
            <main className="main-container">
                { id === localStorage.getItem("userId")
                ? <CreatePost />
                : <></>
                }
                <Posts />
            </main>
            <Footer />
        </div>
    )
};

export default ProfilePage;