import React from "react";

import { Invoice } from "../components/Invoice";
import Voucher from "../components/Voucher";

export function Basket() {

  return (
    <main>
      <h2>Votre panier d'achats</h2>
      <Invoice />
      <Voucher />
    </main>
  );
}
