export const parseCurrency = value =>
	value &&
	value.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
