import NotFoundMessage from "../components/NotFoundMessage";
import Footer from "../components/Footer";


const NotFoundPage = () => {
    return (
        <div>
            <header>
                <div className="header-logo">
                    <img src="./assets/logo-inbetween.png" alt="logo" />
                </div>
            </header>
            <NotFoundMessage />
            <Footer />
        </div>
    )
};

export default NotFoundPage;