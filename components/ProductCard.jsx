import { parseCurrency } from "../utils/parseCurrency";
import { Box, Text, Image, Button, Badge } from "@chakra-ui/react";

const ProductCard = ({ product, setCart }) => {
	const addToCart = product => setCart(cart => cart.concat(product));

	return (
		<Box
			d="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="space-between"
			borderRadius="lg"
			p={5}
			bg="white"
			color="black"
			_hover={{ boxShadow: "md" }}
		>
			<Box d="flex" flexDirection="column" height="100%">
				<Image
					w="100%"
					h="auto"
					alt={product.title}
					loading="lazy"
					borderRadius="lg"
					src={product.image}
					alt={product.image}
					marginY={4}
				/>
				<Text fontSize="2xl">{product.title}</Text>
				<Badge maxWidth="fit-content" colorScheme="primary" variant="subtle" marginY={1}>
					{product.category}
				</Badge>
				<Text fontSize="sm" noOfLines={3} marginY={2}>
					{product.description}
				</Text>
			</Box>

			<Box d="flex" flexDirection="column">
				<Text fontWeight="bold" fontSize="md" marginY={4}>
					{parseCurrency(product.price)}
				</Text>
				<Button
					size="sm"
					onClick={() => addToCart(product)}
					colorScheme="primary"
					variant="outline"
				>
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default ProductCard;
