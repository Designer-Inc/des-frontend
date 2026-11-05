export function formatPrice(minor: number, currency = "UAH"): string {
	return new Intl.NumberFormat("uk-UA", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(minor / 100);
}
