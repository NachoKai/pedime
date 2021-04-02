import { useState, useMemo } from "react";
import { Box, Button, Link, Divider } from "@chakra-ui/react";
import Head from "next/head";
import api from "../api";
import CartList from "../components/CartList";
import Header from "../components/Header";
import ProductsGrid from "../components/ProductsGrid";
import { parseCurrency } from "../utils/parseCurrency";

const Home = ({ products }) => {
	const [cart, setCart] = useState([]);
	const addToCart = product => setCart(cart => cart.concat(product));

	return (
		<>
			<Head>
				<title>Pedi.me</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Divider colorScheme="primary" />
			<ProductsGrid products={products} addToCart={addToCart} />
			<CartList cart={cart} setCart={setCart} />
		</>
	);
};

export const getStaticProps = async () => {
	const products = await api.list();

	return {
		revalidate: 10,
		props: {
			products,
		},
	};
};

export default Home;
