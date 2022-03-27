import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SinglePost from "../components/SinglePost";
import Footer from "../components/Footer";

export default function SinglePostPage() {

    return (
        <div>
            <div>
                <Header />
                <Banner />
                <SinglePost />
                <Footer />
            </div>
        </div>
      )
}
