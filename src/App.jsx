import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Basket } from "./pages/Basket";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { AppContext } from "./AppContext";

export class App extends React.Component {
  /*
   * Le state global de l'application, manipulé en utilisant un contexte React.
   *
   * En permettant aux composants enfants dans la hiérarchie d'agir sur ce state au travers du contexte
   * cela permet de profiter du fonctionnement naturel de React de rafraichissement automatique de
   * l'affichage - appel de la méthode render() - après avoir mis à jour le state via setState().
   */

  state = {
    voucherRate: null,
    basket: [],
    productDatabase: [],
    setVoucherRate: voucherRate => {
      this.setState({ voucherRate: voucherRate }, () => {
        console.log(this.state.voucherRate);
      });
    },

    addToBasket: productCode => {
      // Duplication du state contenant le panier.
      let basket = [...this.state.basket];

      // Recherche du produit dans le panier.
      let basketItem = basket.find(
        basketItem => basketItem.productCode === productCode
      );

      // Est-ce que le produit existe déjà dans le panier ?
      if (basketItem === undefined) {
        // Non, ajout initial du produit.
        basket.push({ productCode: productCode, quantity: 1 });
      } else {
        // Oui, mise à jour de la quantité du produit.
        basketItem.quantity++;
      }

      // Mise à jour du panier.
      this.setState({ basket: basket });
    },

    clearBasket: () => {
      // Vidage complet du panier.
      this.setState({ basket: [] });
    },
  };

  componentDidMount = async () => {
    // const productsPromise = fetch("http://localhost:3000/products");

    // productsPromise
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log(result);
    //     this.setState({ productDatabase: result });
    //     window.localStorage.setItem("productDatabase", JSON.stringify(result));
    //   });

    const productsPromise = await fetch("https://geek-shop-backend.herokuapp.com/products");
    const result = await productsPromise.json();
    this.setState({ productDatabase: result });
    localStorage.setItem("productDB", JSON.stringify(result));

    // const rawResponse = fetch("http://localhost:3000/vouchers", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({ name: "test", reduction: "0.2" }),
    // });

    const voucherDatabase = [
      { NOEL2020: 0.12 },
      { ANNIVERSAIRE: 0.15 },
      { SOLDES_ETE: 0.25 },
    ];

    localStorage.setItem("voucherDB", JSON.stringify(voucherDatabase));
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <BrowserRouter>
          <header>
            <NavBar />
            <h1>Geek Shop</h1>
          </header>

          <Switch>
            <Route exact path="/">
              <Home database={this.state.productDatabase} />
            </Route>
            <Route exact path="/basket">
              <Basket />
            </Route>
            <Route exact path="/product/:code">
              <Product />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}
