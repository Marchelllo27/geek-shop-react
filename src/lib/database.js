export function findProduct(productCode) {
  const productsDataBase = JSON.parse(localStorage.productDB);

  return (
    productsDataBase.find(product => product.productCode === productCode) ??
    false
  );
}

export function findVoucher(voucherCode) {
  const voucherDatabase = JSON.parse(localStorage.voucherDB);

  for (const voucher of voucherDatabase) {
    if (voucherCode in voucher) {
      return voucher[voucherCode];
    }
  }

  return false;
}