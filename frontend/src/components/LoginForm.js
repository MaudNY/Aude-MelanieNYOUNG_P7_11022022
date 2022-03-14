import React from "react";

const LoginForm = () => {
    return (
        <div className="main-login-page">
            <form id="signup-form" method="post">
                <div className="form-block">
                    <label htmlFor="email">Mon adresse email Groupomania *</label>
                    <input type="text" name="email" id="email" placeholder="Ex : alexandre.rouvain@groupomania.com" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Mon mot de passe *</label>
                    <input type="text" name="password" id="password" required/>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <p className="error-message"></p>
                </div>

                <button type="submit" className="submit-button submit-button--login disabled">Connexion</button>

                <div className="required-mention">* Champ obligatoire</div>
            </form>
        </div>
    );
};

export default LoginForm;