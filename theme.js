import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
	colors: {
		primary: theme.colors["purple"],
	},
	fonts: {
		body: "system-ui, sans-serif",
		heading: "Georgia, serif",
		mono: "Menlo, monospace",
	},
});
