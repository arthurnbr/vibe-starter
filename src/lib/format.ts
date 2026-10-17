const currency = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
const number = new Intl.NumberFormat("fr-FR")

export const formatCurrency = (value: number) => currency.format(value)
export const formatNumber = (value: number) => number.format(value)
