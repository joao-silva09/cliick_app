export function BRLFormat(amount) {
  return amount.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
