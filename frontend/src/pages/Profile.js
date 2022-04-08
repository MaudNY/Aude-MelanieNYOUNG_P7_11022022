import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";

const ProfilePage = () => {
    const { id } = useParams();

    return (
        <div>
            <Header />
            <ProfileInfo />
            { id === localStorage.getItem("userId")
            ? <CreatePost />
            : <></>
            }
            <Footer />
        </div>
    )
};

export default ProfilePage;