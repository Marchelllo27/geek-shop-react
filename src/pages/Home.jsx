import React from "react";
import { ProductList } from "../components/ProductList";
import "./home.css";

export function Home(props) {
  return (
    <main>
      <h2>Accueil</h2>
      <ProductList database={props.database}/>
    </main>
  );
}
