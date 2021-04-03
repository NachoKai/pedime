import { useState, useEffect } from "react";
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
	Select,
	Heading,
	Link,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { parseCurrency } from "../utils/parseCurrency";

const ProductsGrid = ({ products, addToCart }) => {
	const [searchField, setSearchFields] = useState("");
	const [categories, setCategories] = useState([]);

	const onSearchChange = event => {
		setSearchFields(event.target.value);
	};

	const filteredProducts = products.filter(product =>
		product.title.toLowerCase().includes(searchField.toLowerCase())
	);

	useEffect(() => {
		const categoryList = [...new Set(products.map(product => product.category))];
		setCategories(categoryList);
	}, []);

	const handleSelectCategory = () => {
		const selectBox = document.getElementById("selectBox");
		const selectedValue = selectBox.options[selectBox.selectedIndex].value;
		window.location.replace(`/#${selectedValue.replace(/\s/g, "").toLowerCase()}`);
	};

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
					backgroundColor="white"
					_placeholder={{ color: "gray.400" }}
				/>
				<Select
					placeholder="Select Category"
					backgroundColor="white"
					_placeholder={{ color: "gray.400" }}
					maxW="200px"
					marginLeft={4}
					onChange={() => handleSelectCategory()}
					id="selectBox"
				>
					{categories.map(category => (
						<option
							key={category}
							value={category}
							as={Link}
							href={`/#${category.replace(/\s/g, "").toLowerCase()}`}
						>
							{category}
						</option>
					))}
				</Select>
			</InputGroup>

			{categories.map(category => (
				<Box key={Math.random()} id={category.replace(/\s/g, "").toLowerCase()}>
					<Box d="flex" marginTop={8} marginBottom={4} p={1} alignItems="flex-end">
						<Heading
							as="h4"
							size="md"
							value={category}
							onClick={() => console.log("hi")}
							marginRight={2}
						>
							{category}
						</Heading>
						<Heading size="md" as="h4" color="gray.500" fontWeight="400">
							({filteredProducts.filter(product => product.category === category).length})
						</Heading>
					</Box>

					<SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
						{filteredProducts
							.filter(product => product.category === category)
							.map(product => (
								<Box
									key={Math.random()}
									d="flex"
									flexDirection="column"
									justifyContent="center"
									borderRadius="lg"
									p={5}
									bg="white"
									color="black"
									boxShadow="md"
								>
									<Image
										borderRadius="lg"
										src={product.image}
										alt={product.image}
										marginBottom={4}
									/>
									<Text fontSize="2xl">{product.title}</Text>
									<Badge
										maxWidth="fit-content"
										colorScheme="primary"
										variant="subtle"
										marginBottom={2}
									>
										{product.category}
									</Badge>
									<Text fontSize="sm" noOfLines={3} marginBottom={4}>
										{product.description}
									</Text>
									<Text fontWeight="bold" fontSize="md" marginBottom={4}>
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
							))}
					</SimpleGrid>
				</Box>
			))}
		</>
	);
};

export default ProductsGrid;
