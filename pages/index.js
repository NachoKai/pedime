import { useState } from "react";
import Head from "next/head";
import api from "../api";
import CartList from "../components/CartList";
import Header from "../components/Header";
import ProductsGrid from "../components/ProductsGrid";

const Home = ({ products }) => {
	const [cart, setCart] = useState([]);

	return (
		<>
			<Head>
				<title>Pedi.me</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Store with whatsapp checkout."></meta>
			</Head>

			<Header />
			<ProductsGrid products={products} setCart={setCart} />
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
