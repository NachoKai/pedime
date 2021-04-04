import { Text, Image, Heading, VStack, Link } from "@chakra-ui/react";

const Header = () => {
	return (
		<VStack marginBottom={8} marginTop={4}>
			<Image
				w="100%"
				h="auto"
				maxWidth="200"
				loading="lazy"
				borderRadius={9999}
				src="https://picsum.photos/128"
				alt=""
			></Image>
			<Heading as={Link} href="/">
				Pedi.me
			</Heading>
			<Text>Test Store</Text>
		</VStack>
	);
};

export default Header;
