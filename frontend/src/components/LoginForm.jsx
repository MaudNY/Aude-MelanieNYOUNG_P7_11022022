import React, { useState } from "react";
import api from "../api/url";

const LoginForm = ({ authenticate }) => {
    // Get input values
    const inputValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from input values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Send login details to open account
    const logIn = (e) => {
        e.preventDefault();
        const loginDetails = { ...formValues };

        api.post('/', loginDetails)
            .then(response => {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("token", response.data.token);
               
                return window.open("http://localhost:3080/home", "_blank");
            })
            .catch(error => {
                
                console.log(error);
            })
    };

    return (
        <main className="main-login-page">
            <form id="login-form" method="post">
                <div className="form-block">
                    <label htmlFor="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" onChange={ setRequestBody } placeholder="Ex : marc.rive@groupomania.com" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Mon mot de passe *</label>
                    <input type="text" name="password" id="password" onChange={ setRequestBody } autoComplete="off" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <button type="submit" className="submit-button disabled" onClick={ logIn }>Connexion</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </main>
    );
};

export default LoginForm;