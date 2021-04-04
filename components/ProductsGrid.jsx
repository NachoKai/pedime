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

const ProductsGrid = ({ products, setCart }) => {
	const [searchField, setSearchFields] = useState("");
	const [categories, setCategories] = useState([]);

	const addToCart = product => setCart(cart => cart.concat(product));

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
			<InputGroup marginY={8}>
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
					placeholder="Categories"
					backgroundColor="white"
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
					{!!filteredProducts.filter(product => product.category === category).length && (
						<Box d="flex" marginTop={8} marginBottom={4} p={1} alignItems="flex-end">
							<Heading as="h4" size="md" value={category} marginRight={2}>
								{category}
							</Heading>
							<Heading size="md" as="h4" color="gray.500" fontWeight="400">
								(
								{filteredProducts.filter(product => product.category === category).length}
								)
							</Heading>
						</Box>
					)}

					<SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
						{filteredProducts
							.filter(product => product.category === category)
							.map(product => (
								<Box
									key={Math.random()}
									d="flex"
									flexDirection="column"
									justifyContent="center"
									alignItems="space-between"
									borderRadius="lg"
									p={5}
									bg="white"
									color="black"
									boxShadow="md"
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
										<Badge
											maxWidth="fit-content"
											colorScheme="primary"
											variant="subtle"
											marginY={1}
										>
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
							))}
					</SimpleGrid>
				</Box>
			))}
		</>
	);
};

export default ProductsGrid;
