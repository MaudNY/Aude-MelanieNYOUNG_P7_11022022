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

    // Send new user data to create a new account
    const createNewUser = async (e) => {
        e.preventDefault();
        const newUser = { ...formValues };

        // Passwords variables
        const $passwordInput = document.querySelector("#password");
        const $passwordConfirmationInput = document.querySelector("#password-confirmation");

        // Reset all error classes from the document
        function resetAllErrorClasses() {
            const errorClassList = document.querySelectorAll(".error");
            const errorClassTable = Array.from(errorClassList);

            if (errorClassTable.length !== 0) {

                for (let $formBlock of errorClassTable) {
                    $formBlock.classList.remove("error");
                    const $errorMessage = $formBlock.querySelector(".error-message");
                    $errorMessage.innerHTML = "";
                }
            }
        };

        resetAllErrorClasses();

        // Set errors for password inputs (password & password confirmation)
        if ($passwordInput.value === null || $passwordInput.value === undefined  || $passwordInput.value.trim() === "") {
            $passwordInput.parentElement.classList.add("error");
            let $wrongInputMessage = document.getElementById(`${$passwordInput.id}-error`);
            $wrongInputMessage.innerHTML = "Ce champ ne peut pas être vide";
        } else if ($passwordConfirmationInput.value !== $passwordInput.value) {
            $passwordConfirmationInput.parentElement.classList.add("error");
            let $wrongInputMessage = document.getElementById(`${$passwordConfirmationInput.id}-error`);
            $wrongInputMessage.innerHTML = "Les deux mots de passe ne sont pas identiques";
        } else {

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
                localStorage.setItem("profileImageUrl", response.data.profileImageUrl);
                localStorage.setItem("role", response.data.role);
               
                return window.location = "/home";
            })
            .catch(error => {
                // GET ERRORS TABLE from backend
                const errorsTable = error.response.data.errors;
                console.log(errorsTable);

                // VARIABLES
                const $emailError = document.querySelector("#email-error");
                const $formBlockEmail = $emailError.parentElement;

                // Reset all error classes from the document
                resetAllErrorClasses();

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
                        
                    }
                }
                
                return console.error(errorsTable);
            })

        }
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

                <div className="form-block">
                    <label htmlFor="passwordConfirmation">Confirmez votre mot de passe *</label>
                    <input type="password" name="passwordConfirmation" id="password-confirmation" className="form-inputs" autoComplete="off" required/>
                    <i className="fas fa-exclamation-circle"></i>
                    <p id="password-confirmation-error" className="error-message"></p>
                </div>

                <button type="submit" className="submit-button" onClick={ createNewUser }>Inscription</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </main>
    );
};

export default SignupForm;