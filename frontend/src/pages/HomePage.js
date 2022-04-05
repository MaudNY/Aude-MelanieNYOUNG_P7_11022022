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

        const $clickedElement = document.querySelector(".clicked");

        if ($clickedElement && !e.target.classList.contains("post-actions-icon")) {
            $clickedElement.classList.remove("clicked");
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