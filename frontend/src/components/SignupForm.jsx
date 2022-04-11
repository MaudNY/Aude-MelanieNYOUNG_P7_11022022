import React, { useState } from "react";
import api from "../api/url";

const SignupForm = () => {
    // Get input values
    const inputValues = { firstName: "", lastName: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from imput values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        
        return setFormValues({ ...formValues, [name]: value });
    };

    // Set new user data
    const createNewUser = async (e) => {
        e.preventDefault();
        const newUser = { ...formValues };

        // Send new user data to sign up and log in
        api.post('/signup', newUser)
            .then(response => {
                console.log(response.data.message);

                const email = formValues.email;
                const password = formValues.password;

                return api.post('/', { email: email, password: password });
            })
            .then(response => {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("profileImageUrl", "");
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("firstName", response.data.firstName);
                localStorage.setItem("lastName", response.data.lastName);
                
            })
            .then(() => {
                
                return window.location = "/home";
            })
            .catch(error => {
                // GET ERRORS TABLE from backend
                const errorsTable = error.response.data.errors;
                console.log(errorsTable);

                // VARIABLES
                const $emailError = document.querySelector("#email-error");
                const $formBlockEmail = $emailError.parentElement;
                const $passwordError = document.querySelector("#password-error");
                const $formBlockPassword = $passwordError.parentElement;

                // Reset all error classes from the document
                const errorClassList = document.querySelectorAll(".error");
                const errorClassTable = Array.from(errorClassList);

                if (errorClassTable && errorClassTable.length !== 0) {

                    for (let $formBlock of errorClassTable) {
                        $formBlock.classList.remove("error");
                        const $errorMessage = $formBlock.querySelector(".error-message");
                        $errorMessage.innerHTML = "";
                    }
                }

                // Mention where the error lies with ERRORS TABLE
                for (let error of errorsTable) {
                    const wrongInputId = error.path;
                    const errorType = error.type;
                    const $wrongInput = document.getElementById(wrongInputId);

                    if ($wrongInput.id === "firstName" || $wrongInput.id === "lastName") {
                        $wrongInput.parentElement.classList.add("error");
                        let $wrongInputMessage = document.getElementById(`${$wrongInput.id}-error`);
                        $wrongInputMessage.innerHTML = "Veuillez correctement renseigner ce champ";

                    } else if ($wrongInput.id === "email" && errorType === "unique violation") {
                        $formBlockEmail.classList.add("error");
                        $emailError.innerHTML = "Cette adresse email est déjà utilisée";

                    } else if ($wrongInput.id === "email" && errorType === "Validation error") {
                        $formBlockEmail.classList.add("error");
                        $emailError.innerHTML = "Veuillez renseigner une adresse email valide";
                        
                    } else if ($wrongInput.id === "password") {
                        $formBlockPassword.classList.add("error");
                        $passwordError.innerHTML = "Veuillez renseigner un mot de passe"
                    }
                }
                
                return console.error(errorsTable);
            })
    };

    return (
        <main className="main-login-page">
            <form id="signup-form" method="post">
                <div className="form-block">
                    <label htmlFor="firstName">Mon prénom *</label>
                    <input type="text" name="firstName" id="firstName" className="form-inputs" value={ formValues.firstName } onChange={ setRequestBody } autoComplete="off" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="firstName-error" className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="lastName">Mon nom *</label>
                    <input type="text" name="lastName" id="lastName" className="form-inputs" value={ formValues.lastName } onChange={ setRequestBody } autoComplete="off" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="lastName-error" className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" className="form-inputs" value={ formValues.email } onChange={ setRequestBody} placeholder="Ex : marc.rive@groupomania.com" autoComplete="off" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="email-error" className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Mon mot de passe *</label>
                    <input type="password" name="password" id="password" className="form-inputs" value={ formValues.password } onChange={ setRequestBody } autoComplete="off" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="password-error" className="error-message"></p>
                </div>

                <button type="submit" className="submit-button" onClick={ createNewUser }>Inscription</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </main>
    );
};

export default SignupForm;