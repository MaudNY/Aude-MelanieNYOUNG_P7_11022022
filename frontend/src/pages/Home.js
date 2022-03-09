import Navigation from "../components/Navigation";
import BannerHeader from "../components/BannerHeader";
import HomeMain from "../components/HomeMain";

const Home = () => {
    return (
        <div className="Home">
            <Navigation />
            <BannerHeader />
            <HomeMain />
        </div>
    )
};

export default Home;