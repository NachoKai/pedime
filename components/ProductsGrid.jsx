import { useState, useEffect } from "react";
import {
	SimpleGrid,
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Heading,
	Link,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ProductCard from "./ProductCard";

const ProductsGrid = ({ products, setCart }) => {
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
	}, [products]);

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
								<ProductCard key={Math.random()} product={product} setCart={setCart} />
							))}
					</SimpleGrid>
				</Box>
			))}
		</>
	);
};

export default ProductsGrid;
