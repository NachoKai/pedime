import { useEffect } from "react";
import { useRouter } from "next/router";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import theme from "../theme";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
	const { pathname } = useRouter();
	const lang = pathname.startsWith("/es") ? "es" : "en";

	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	return (
		<ChakraProvider theme={theme}>
			<Box p={4}>
				<Container
					maxWidth="container.xl"
					p={4}
					boxShadow="md"
					borderRadius="xl"
					backgroundColor="primary.50"
					color="#222"
				>
					<Component {...pageProps} />
				</Container>
			</Box>
		</ChakraProvider>
	);
};

export default App;
