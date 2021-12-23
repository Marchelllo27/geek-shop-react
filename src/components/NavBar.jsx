import React, { useContext } from 'react';

// Composant de React Router
import { NavLink } from 'react-router-dom';

// Contexte de l'application
import { AppContext } from '../AppContext';

// Feuille de styles spécifique à cette page (importation via Webpack).
import './navbar.css';


export function NavBar() {

    /*
     * Récupération du contexte de l'application contenant notamment le panier.
     *
     * Voir la documentation de la fonction useContext() :
     * https://fr.reactjs.org/docs/hooks-reference.html#usecontext
     */
    const context = useContext(AppContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation-bar">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navigation-bar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* Utilisation de React Router pour créer les liens de navigation :
                            https://reacttraining.com/react-router/web/api/NavLink */}
                        <NavLink exact className="nav-link" to="/">Accueil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/basket">Panier</NavLink>
                    </li>
                </ul>
            </div>
            <span className="navbar-text" data-testid="basket">Panier : <strong>{ context.basket.length }</strong> produit(s)</span>
        </nav>
    );
}