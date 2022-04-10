import React, { useState } from "react";
import api from "../api/url";

const LoginForm = () => {
    // Get input values
    const inputValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from input values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        
        return setFormValues({ ...formValues, [name]: value });
    };

    // Send login details to open account
    const logIn = (e) => {
        e.preventDefault();
        const loginDetails = { ...formValues };

        const $emailError = document.querySelector("#email-error");
        const $passwordError = document.querySelector("#password-error");

        const $formBlockEmail = $emailError.parentElement;
        const $formBlockPassword = $passwordError.parentElement;

        api.post('/', loginDetails)
            .then(response => {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("profileImageUrl", response.data.profileImageUrl);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("firstName", response.data.firstName);
                localStorage.setItem("lastName", response.data.lastName);

            })
            .then(() => {
                
                return window.location = "/home";
            })
            .catch((error) => {
                const errorData = error.response.data;
                const errorMessage = error.response.data.message;

                if (errorMessage === "Cet utilisateur n'a pas été trouvé") {
                    $formBlockPassword.classList.remove("error");
                    $passwordError.innerHTML = "";
                    
                    $formBlockEmail.classList.add("error");
                    $emailError.innerHTML = errorMessage;
                } else if (errorMessage === "Mot de passe incorrect") {
                    $formBlockEmail.classList.remove("error");
                    $emailError.innerHTML = "";

                    $formBlockPassword.classList.add("error");
                    $passwordError.innerHTML = errorMessage;
                } else {
                    $emailError.innerHTML = errorMessage;
                }
                
                return console.log(errorData);
            })
    };

    return (
        <main className="main-login-page">
            <form id="login-form" method="post">
                <div className="form-block">
                    <label htmlFor="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" className="form-inputs" onChange={ setRequestBody } placeholder="Ex : marc.rive@groupomania.com" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="email-error" className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Mon mot de passe *</label>
                    <input type="password" name="password" id="password" className="form-inputs" onChange={ setRequestBody } autoComplete="off" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="password-error" className="error-message"></p>
                </div>

                <button type="submit" className="submit-button" onClick={ logIn }>Connexion</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </main>
    );
};

export default LoginForm;