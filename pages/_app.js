import React from "react";
import "../styles/globals.css";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import theme from "../theme";

const App = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Box p={4}>
				<Container
					backgroundColor="primary"
					maxWidth="container.xl"
					p={4}
					boxShadow="md"
					borderRadius="xl"
				>
					<Component {...pageProps} />
				</Container>
			</Box>
		</ChakraProvider>
	);
};

export default App;
