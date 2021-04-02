import { Text, Image, Heading, VStack } from "@chakra-ui/react";

const Header = () => {
	return (
		<VStack marginBottom={8} marginTop={4}>
			<Image borderRadius={9999} src="https://picsum.photos/128"></Image>
			<Heading>Pedi.me</Heading>
			<Text>Test Tienda</Text>
		</VStack>
	);
};

export default Header;
