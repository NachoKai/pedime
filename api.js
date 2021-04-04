import axios from "axios";
import Papa from "papaparse";

export default {
	list: async () =>
		axios
			.get(
				"https://docs.google.com/spreadsheets/d/e/2PACX-1vQwdmDBtDZzhJ6r0gF307ZpTNWsAb6PDwUn5GGwwynVxsV82HQDL09MiZgvNWjzf9fkvKbYLgmCyO91/pub?output=csv",
				{
					responseType: "blob",
				}
			)
			.then(
				response =>
					new Promise((resolve, reject) => {
						Papa.parse(response.data, {
							header: true,
							complete: results =>
								resolve(
									results.data.map(product => ({
										...product,
										price: Number(product.price),
									}))
								),
							error: err => reject(err.message),
						});
					})
			),
};
