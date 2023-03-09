export class formatter {
  static price(amount = 0, opts?: Intl.NumberFormatOptions) {
    const formatter = Intl.NumberFormat("en", {
      notation: "compact",
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 2,
      ...opts,
    });
    return formatter.format(amount);
  }
}
