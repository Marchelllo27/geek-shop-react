import React from 'react';

import { formatMoney } from '../lib/utilities';


export function InvoiceLine(props) {

    /*
     * Explication des lignes de code 27 et 28 au niveau de l'attribut JSX onClick pour les boutons + / -
     *
     * Il faut qu'au clic sur l'un des boutons, le composant parent Invoice soit rappelé (callback editQuantity).
     * Le callback est passé en prop (props.editQuantity) par le composant parent Invoice.
     * 
     * Mais si on écrit par exemple onClick={ props.editQuantity(props.productCode, +1) }
     * Le callback sera immédiatement appelé ! Les parenthèses invoquent le callback editQuantity...
     * 
     * L'utilisation d'une fonction fléchée ici est toute trouvée : la syntaxe légère en une ligne permet de bloquer l'appel
     * immédiat au callback, et l'attribut JSX onClick se voit affecté la fonction fléchée, qui attend du coup d'être exécutée au clic.
     */
    return (
        <tr>
            <td>{ props.productCode }</td>
            <td>{ props.description }</td>
            <td>{ props.quantity }</td>
            <td>
                <div className="btn-group">
                    <button className="btn btn-outline-secondary btn-sm" onClick={ () => props.editQuantity(props.productCode, +1) }>+</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={ () => props.editQuantity(props.productCode, -1) }>-</button>
                </div>
            </td>
            <td className="text-right">{ formatMoney(props.unitPrice) }</td>
            <td className="text-right">{ formatMoney(props.quantity * props.unitPrice) }</td>
        </tr>
    );
}