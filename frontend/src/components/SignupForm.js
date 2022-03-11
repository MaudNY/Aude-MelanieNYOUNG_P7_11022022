import React from "react";

const SignupForm = () => {
    return (
        <div className="main-login-page">
            <form id="signup-form" method="post">
                <div class="form-block">
                    <label for="firstName">Mon prénom *</label>
                    <input type="text" name="firstName" id="firstName" minlength="2" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message"></p>
                </div>

                <div class="form-block">
                    <label for="lastName">Mon nom *</label>
                    <input type="text" name="lastName" id="lastName" minlength="2" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message"></p>
                </div>

                <div class="form-block">
                    <label for="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" placeholder="Ex : alexandre.rouvain@groupomania.com" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message"></p>
                </div>

                <div class="form-block">
                    <label for="password">Mon mot de passe *</label>
                    <input type="text" name="password" id="password" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message"></p>
                </div>

                <div class="form-block">
                    <label for="password-confirmation">Confirmation de mot de passe *</label>
                    <input type="text" name="password-confirmation" id="password-confirmation" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message"></p>
                </div>

                <button type="submit" className="submit-button submit-button--signup disabled">Inscription</button>

                <div className="required-mention">* Champs obligatoires</div>
            </form>
        </div>
    );
};

export default SignupForm;