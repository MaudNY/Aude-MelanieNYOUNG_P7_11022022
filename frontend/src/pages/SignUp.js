import SignupForm from "../components/SignupForm";
import Header from "../components/Header";
import Banner from "../components/Banner";
import NavigationLoginPage from "../components/NavigationLoginPage";
import Footer from "../components/Footer";


const SignUpPage = () => {
    return (
        <div className="signup">
            <Header />
            <Banner />
            <NavigationLoginPage />
            <SignupForm />
            <Footer />
        </div>
    )
};

export default SignUpPage;