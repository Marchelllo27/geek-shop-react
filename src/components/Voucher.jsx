import React from "react";
import "./Vaucher.css";
import { findVoucher } from "../lib/database";
import { AppContext } from "../AppContext";

class Voucher extends React.Component {
  state = {
    value: "",
    validationMessage: "",
    validationMessageClass: "",
    isDisabled: true,
    voucherRate: null,
  };

  static contextType = AppContext;

  handleChange = event => {
    if (this.state.value === "") {
      this.setState({ validationMessage: "" });
    }

    const inputValue = event.target.value.toUpperCase();
    const tauxPromo = findVoucher(inputValue);

    if (tauxPromo) {
      this.setState({
        validationMessage: `Code valide: ${tauxPromo * 100}% de reduction`,
        validationMessageClass: "text-success",
        isDisabled: false,
        voucherRate: tauxPromo,
      });
    } else {
      this.setState({
        validationMessage: "not valid",
        validationMessageClass: "text-danger",
        isDisabled: true,
      });
    }

    this.setState({ value: inputValue });
  };

  onClickApplyVaucher = event => {
    this.context.setVoucherRate(this.state.voucherRate);
  };

  render() {
    if (this.context.basket.length === 0) {
      return null;
    }

    return (
      <section className="vaucher">
        <label htmlFor="promo-input">Code de Réduction</label>
        <input
          id="promo-input"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <small className={this.state.validationMessageClass} id="existe">
          {this.state.validationMessage}
        </small>
        <button
          onClick={this.onClickApplyVaucher}
          className="btn btn-primary"
          disabled={this.state.isDisabled}
        >
          Valider
        </button>
      </section>
    );
  }
}

export default Voucher;
