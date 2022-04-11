import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import Footer from "../components/Footer";

const ProfilePage = () => {
    const { id } = useParams();

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