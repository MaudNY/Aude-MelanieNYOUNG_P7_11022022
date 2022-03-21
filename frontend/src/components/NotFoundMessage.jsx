import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundSection = () => {
    return (
        <main id="not-found-section">
            <div id="not-found-message">
                <div id="error-code">404</div><br/>

                Oups ! La page demandée n'existe pas... <span>&#x1F62D;</span><br/><br/><br/>

                <NavLink exact="true" to="/home" id="redirection-button">Page d'accueil</NavLink>
            </div>
        </main>
    );
};

export default NotFoundSection;