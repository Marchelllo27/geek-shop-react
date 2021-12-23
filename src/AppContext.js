import React from 'react';


/*
 * Création du contexte de l'application.
 *
 * Voir la documentation de la méthode createContext() :
 * https://fr.reactjs.org/docs/context.html#reactcreatecontext
 */
export const AppContext = React.createContext({
    basket: [],
    voucherRate : null,
    addToBasket : (productCode) => {},
    clearBasket : () => {}
});

/*
 * La fourniture d'un argument avec un objet contenant les propriétés et valeurs par défaut
 * n'est pas obligatoire mais est recommandé notamment car l'IDE (VS.Code par exemple) arrive
 * à ce moment-là à suivre ce qu'il y a à l'intérieur du contexte et fournit de l'aide.
 */