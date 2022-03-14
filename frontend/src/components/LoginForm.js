import React, { useState } from "react";
import api from "../api/url";

const LoginForm = () => {
    // Get input values
    const inputValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from imput values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Send login details to open account
    const logIn = async (e) => {
        e.preventDefault();
        const loginDetails = { ...formValues };

        api.post('/login', loginDetails)
            .then(response => {
               localStorage.setItem("token", response.data.token);
               response.config = {
                   headers: {
                       ...response.config.headers,
                        Authorization: "Bearer " + response.data.token
                   }
               }

               console.log("Response :", response.config);

               return window.open("http://localhost:3001/", "_blank");
            })
            .catch(error => {
                
                console.log(error);
            })
    };

    return (
        <main className="main-login-page">
            <form id="signup-form" method="post">
                <div className="form-block">
                    <label htmlFor="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" onChange={ setRequestBody } placeholder="Ex : marc.rive@groupomania.com" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Mon mot de passe *</label>
                    <input type="text" name="password" id="password" onChange={ setRequestBody } required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <button type="submit" className="submit-button submit-button--login disabled" onClick={ logIn }>Connexion</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </main>
    );
};

export default LoginForm;