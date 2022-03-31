import Header from "../components/Header";
import Banner from "../components/Banner";
import HomeFeed from "../components/HomeFeed";
import Footer from "../components/Footer";

const HomePage = () => {
    const resetPostOptions = (e) => {
        e.preventDefault();
        const $postOptions = document.querySelector("#post-options");

        if ($postOptions && !e.target.classList.contains("post-actions-icon")) {
            $postOptions.remove();
        }
    }
       
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