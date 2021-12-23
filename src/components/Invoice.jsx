import React from "react";

import { InvoiceLine } from "./InvoiceLine";

// Contexte de l'application
import { AppContext } from "../AppContext";

import { findProduct } from "../lib/database";
import { formatMoney } from "../lib/utilities";

export class Invoice extends React.Component {
  /*
   * Récupération du contexte de l'application.
   * Le contexte est par la suite accessible via la propriété this.context.
   *
   * Voir la documentation de la propriété statique contextType :
   * https://reactjs.org/docs/context.html#classcontexttype
   */
  static contextType = AppContext;

  totalAmount = 0; // montant total HT
  vatAmount = 0; // montant TVA
  grandTotal = 0; // montant total TTC
  voucherAmount = 0;

  state = {
    invoiceLines: [], // données de facturation
  };

  componentDidMount() {
    // Parcours du panier de commande afin de construire le state initial des données de facturation.
    const invoiceLines = this.context.basket.map(basketItem => {
      /*
       * L'objet basketItem contient deux propriétés :
       * - Le code du produit à ajouter à la facture (productCode)
       * - La quantité désirée (quantity)
       */

      // Recherche du produit en fonction de son code.
      const product = findProduct(basketItem.productCode);

      if (product === false) {
        throw new Error(
          `Il n'y a aucun produit avec le code ${basketItem.productCode} !`
        );
      }

      // Création d'une ligne de facturation regroupant les informations du produit et la quantité désirée.
      return { ...product, quantity: basketItem.quantity };
    });

    // Mise à jour du state complet (données de facturation puis les montants de la facture).
    this.setState({ invoiceLines: invoiceLines });
  }

  compute() {
    this.totalAmount = this.state.invoiceLines.reduce(function (
      accumulator,
      invoiceLine
    ) {
      return accumulator + invoiceLine.quantity * invoiceLine.unitPrice;
    },
    0);

    if (this.context.voucherRate === null) {
      // Calcul du montant de TVA
      this.vatAmount = this.totalAmount * 0.2;

      // Calcul du montant total TTC
      this.grandTotal = this.totalAmount + this.vatAmount;
    } else {
      this.voucherAmount = this.totalAmount * this.context.voucherRate;

      // Calcul du montant de TVA
      this.vatAmount = (this.totalAmount - this.voucherAmount) * 0.2;

      // Calcul du montant total TTC
      this.grandTotal = this.totalAmount - this.voucherAmount + this.vatAmount;
    }
  }

  editQuantity = (productCode, amount) => {
    let invoiceLines;
    let invoiceLine;

    // Duplication du state contenant les données de facturation.
    invoiceLines = [...this.state.invoiceLines];

    // Recherche de la ligne de facturation correspondant au code de produit spécifié.
    invoiceLine = invoiceLines.find(
      invoiceLine => invoiceLine.productCode === productCode
    );

    // Est ce que la quantité calculée pour la ligne de facturation reste valide ?
    if (invoiceLine.quantity + amount > 0) {
      // Oui, mise à jour de cette quantité.
      invoiceLine.quantity += amount;

      // Mise à jour du state contenant les données de facturation avec la version dupliquée.
      this.setState({ invoiceLines: invoiceLines });
    }
  };

  render() {
    // Recalcul de tous les montants de la facture.
    this.compute();

    // Construction d'une collection de composants React en partant du state de données de facturation.
    const invoiceLines = this.state.invoiceLines.map((invoiceLine, index) => {
      // Construction d'un composant InvoiceLine avec les données d'une ligne de facturation.
      return (
        <InvoiceLine
          key={index}
          productCode={invoiceLine.productCode}
          description={invoiceLine.description}
          quantity={invoiceLine.quantity}
          unitPrice={invoiceLine.unitPrice}
          editQuantity={this.editQuantity}
        />
      );
    });

    // JSX conditionnel : il est renvoyé à React dans le cas où le panier serait vide.
    if (invoiceLines.length === 0) {
      return (
        <p>
          Oups, votre panier d'achats est vide, commencez par ajouter quelques
          produits depuis l'accueil !
        </p>
      );
    }

    // console.log("I'm here " + this.context.voucherRate);
    // let reduction;
    // if (this.context.voucherRate && this.context.voucherRate > 0) {
    //   <tr>
    //     <td className="text-right" colSpan="5">
    //       Réduction({this.context.voucherRate * 100}%):
    //     </td>
    //     <td className="text-right">
    //       - {formatMoney(this.totalAmount * this.context.voucherRate)}
    //     </td>
    //   </tr>;
    // } else {
    //   reduction = null;
    // }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th># Produit</th>
            <th>Description</th>
            <th colSpan="2">Quantité</th>
            <th className="text-right">Prix Unitaire</th>
            <th className="text-right">Prix Total</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td className="text-right" colSpan="5">
              <strong>Montant total HT :</strong>
            </td>
            <td className="text-right">
              <strong>{formatMoney(this.totalAmount)}</strong>
            </td>
          </tr>

          {this.context.voucherRate && (
            <tr>
              <td className="text-right" colSpan="5">
                Réduction({this.context.voucherRate * 100}%):
              </td>
              <td className="text-right">
                - {formatMoney(this.voucherAmount)}
              </td>
            </tr>
          )}

          <tr>
            <td className="text-right" colSpan="5">
              TVA (20 %) :
            </td>
            <td className="text-right">+ {formatMoney(this.vatAmount)}</td>
          </tr>
          <tr>
            <td className="text-right" colSpan="5">
              <strong>Montant total TTC :</strong>
            </td>
            <td className="text-right">
              <strong>{formatMoney(this.grandTotal)}</strong>
            </td>
          </tr>
        </tfoot>
        <tbody>{invoiceLines}</tbody>
      </table>
    );
  }
}
