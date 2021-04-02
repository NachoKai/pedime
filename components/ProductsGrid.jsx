import { useState } from "react";
import {
	SimpleGrid,
	Box,
	Text,
	Image,
	Button,
	Badge,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { parseCurrency } from "../utils/parseCurrency";

const ProductsGrid = ({ products, addToCart }) => {
	const [searchField, setSearchFields] = useState("");

	const onSearchChange = event => {
		setSearchFields(event.target.value);
	};

	const filteredProducts = products.filter(product =>
		product.title.toLowerCase().includes(searchField.toLowerCase())
	);

	return (
		<>
			<InputGroup marginBottom={8}>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.300" />}
				/>
				<Input
					aria-label="Search product"
					type="text"
					placeholder="Search product..."
					onChange={onSearchChange}
				/>
			</InputGroup>

			<SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
				{filteredProducts.map(product => (
					<Box
						d="flex"
						flexDirection="column"
						justifyContent="center"
						borderRadius="lg"
						p={5}
						bg="white"
						color="black"
						key={product.id}
					>
						<Image src={product.image} alt={product.image} marginBottom={4} />
						<Text fontSize="2xl">{product.title}</Text>
						<Badge colorScheme="primary" variant="subtle" marginBottom={2}>
							{product.category}
						</Badge>
						<Text fontSize="sm" noOfLines={3} marginBottom={4}>
							{product.description}
						</Text>
						<Text fontWeight="bold" fontSize="md" marginBottom={4}>
							{parseCurrency(product.price)}
						</Text>

						<Button size="sm" onClick={() => addToCart(product)} colorScheme="primary">
							Add
						</Button>
					</Box>
				))}
			</SimpleGrid>
		</>
	);
};

export default ProductsGrid;
