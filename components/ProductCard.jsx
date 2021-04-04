import { useCallback, useState } from "react";
import { parseCurrency } from "../utils/parseCurrency";
import { Box, Text, Image, Button, Badge, Collapse } from "@chakra-ui/react";

const ProductCard = ({ product, setCart }) => {
	const [show, setShow] = useState(false);
	const addToCart = product => setCart(cart => cart.concat(product));

	const handleToggle = useCallback(() => {
		setShow(!show);
	}, [show]);

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
			_hover={{ boxShadow: "lg" }}
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

				{product.description.length > 130 ? (
					<>
						<Collapse marginY={2} startingHeight={60} in={show}>
							<Text fontSize="sm">{product.description}</Text>
						</Collapse>
						<Button
							backgroundColor="white"
							justifyContent="flex-end"
							fontWeight={400}
							color="gray.500"
							size="sm"
							onClick={handleToggle}
							mt="8px"
						>
							Show {show ? "Less" : "More"}
						</Button>
					</>
				) : (
					<Text fontSize="sm">{product.description}</Text>
				)}
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
