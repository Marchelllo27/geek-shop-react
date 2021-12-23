import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { formatMoney } from "../lib/utilities";

export class ProductList extends React.Component {
  /*
   * Récupération du contexte de l'application.
   * Le contexte est par la suite accessible via la propriété this.context.
   *
   * Voir la documentation de la propriété statique contextType :
   * https://reactjs.org/docs/context.html#classcontexttype
   */
  static contextType = AppContext;

  onClickAddToBasket = event => {
    /*
     * Ajoute le produit au panier situé dans le contexte de l'application.
     * L'attribut data-product du bouton sur lequel on a cliqué contient le code du produit.
     */
    this.context.addToBasket(event.target.dataset.product);
  };

  render() {
    // Construction d'une collection de composants React en partant de la base de données des produits passée en prop.
    const productList = this.props.database.map((product, index) => {
      return (
        <article className="card" key={index}>
          {/* Utilisation de React Router pour créer les liens de navigation : https://reacttraining.com/react-router/web/api/NavLink */}
          <Link
            exact
            className="nav-link"
            to={`/product/${product.product_code}`}
          >
            <img
              src={`/images/products/${product.product_code.toLowerCase()}.jpg`}
              className="card-img-top"
              alt={product.description}
            />
          </Link>

          <div className="card-body">
            <h6 className="card-title">{product.description}</h6>

            {/* L'attribut aria-label sert aux tests du composant (dans ProductList.test.jsx) */}
            <h5 className="price" aria-label="Prix du produit">
              {formatMoney(product.unitPrice)}
            </h5>

            {/* Fourniture du code du produit au bouton via un attribut data-product */}
            <button
              className="btn btn-primary btn-sm"
              data-product={product.product_code}
              onClick={this.onClickAddToBasket}
            >
              +
            </button>
          </div>
        </article>
      );
    });

    return <section className="product-list">{productList}</section>;
  }
}
