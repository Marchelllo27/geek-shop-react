import React from 'react';

// Hook de React Router
import { useParams } from 'react-router-dom';

import { findProduct } from '../lib/database';
import { formatMoney } from '../lib/utilities';


export function Product() {

    /*
     * Utilisation du hook de ReactRouter pour récupérer le code du produit.
     * Voir https://reactrouter.com/web/api/Hooks/useparams
     */
    const { code } = useParams();

    // Recherche du produit en fonction de son code.
    const product = findProduct(code);

    if(product === false) {
        // Retourne un rendu spécifique pour gérer l'erreur.
        return <main><p className="alert alert-danger" role="alert">Ce produit n'existe pas :-(</p></main>
    }

    return (
        <main>
            <h2>{ product.description }</h2>

            <article className="card">
                <img src={ `/images/products/${ product.productCode.toLowerCase() }.jpg` } className="card-img-top" alt={ product.description } />
                <div className="card-body">
                    <h6 className="card-title">{ product.description }</h6>

                    <h5 className="price">{ formatMoney(product.unitPrice) }</h5>
                </div>
            </article>
        </main>
    );
}