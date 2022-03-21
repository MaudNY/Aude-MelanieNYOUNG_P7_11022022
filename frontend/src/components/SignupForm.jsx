import React, { useState } from "react";
import api from "../api/url";

const SignupForm = () => {
    // Get input values
    const inputValues = { firstName: "", lastName: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from imput values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Send new user data to create a new account
    const createNewUser = async (e) => {
        e.preventDefault();
        const newUser = { ...formValues };

        api.post('/signup', newUser)
            .then(response => {

                return console.log(response.data.message);
            })
            .then(() => {
                const email = formValues.email;
                const password = formValues.password;

                return api.post('/', { email: email, password: password })
            })
            .then(response => {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("token", response.data.token);
               
                return window.open("http://localhost:3080/home", "_blank");
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <main className="main-login-page">
            <form id="signup-form" method="post">
                <div className="form-block">
                    <label htmlFor="firstName">Mon prénom *</label>
                    <input type="text" name="firstName" id="firstName" value={ formValues.firstName } onChange={ setRequestBody } required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="lastName">Mon nom *</label>
                    <input type="text" name="lastName" id="lastName" value={ formValues.lastName } onChange={ setRequestBody } required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" value={ formValues.email } onChange={ setRequestBody} placeholder="Ex : marc.rive@groupomania.com" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Mon mot de passe *</label>
                    <input type="text" name="password" id="password" value={ formValues.password } onChange={ setRequestBody } required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="passwordConfirmation">Confirmez votre mot de passe *</label>
                    <input type="text" name="passwordConfirmation" id="passwordConfirmation" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <button type="submit" className="submit-button disabled" onClick={ createNewUser }>Inscription</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </main>
    );
};

export default SignupForm;