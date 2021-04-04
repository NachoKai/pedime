import { useRef, useMemo } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Text,
	Box,
	Link,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon, PhoneIcon } from "@chakra-ui/icons";
import { parseCurrency } from "../utils/parseCurrency";

const CartList = ({ cart, setCart }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const uniqueProducts = [...new Set(cart)];

	const removeProduct = (cart, product) => {
		const valueId = cart.findIndex(({ id }) => id === product.id);
		const newArray = [...cart.slice(0, valueId), ...cart.slice(valueId + 1)];
		return setCart([...newArray]);
	};

	const addProduct = (cart, product) => {
		return setCart([...cart, product]);
	};

	const orderText = useMemo(
		() =>
			uniqueProducts
				.reduce(
					(message, product) =>
						message.concat(
							`-${product.title} x ${
								cart.filter(p => p.id === product.id).length
							}: ${parseCurrency(
								product.price * cart.filter(p => p.id === product.id).length
							)}\n`
						),
					``
				)
				.concat(
					`\nTotal: ${parseCurrency(
						cart.reduce((total, product) => total + product.price, 0)
					)}`
				),
		[uniqueProducts, cart]
	);

	return (
		<>
			<Box margin="auto" marginTop={8} position="sticky" bottom={4} w="fit-content">
				{!!cart.length && (
					<Button ref={btnRef} colorScheme="primary" onClick={onOpen} p={8}>
						Show Cart: {cart.length} {cart.length !== 1 ? "products" : "product"} (
						{parseCurrency(cart.reduce((total, product) => total + product.price, 0))})
					</Button>
				)}
			</Box>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Cart List ({cart.length})</DrawerHeader>

						<DrawerBody d="flex" flexDirection="column" justifyContent="space-between">
							<Box>
								{uniqueProducts.map(product => (
									<Box
										key={`${Math.random()}-${product.id}`}
										d="flex"
										justifyContent="space-between"
										alignItems="center"
									>
										<Text marginY={4} maxWidth="185">
											-
											{`${product.title} x ${
												cart.filter(p => p.id === product.id).length
											}: ${parseCurrency(
												product.price * cart.filter(p => p.id === product.id).length
											)}\n`}
										</Text>
										<Box>
											<MinusIcon
												cursor="pointer"
												onClick={() => removeProduct(cart, product)}
												border="2px solid white"
												borderRadius={25}
												w="23px"
												h="23px"
												p={1}
											/>
											<AddIcon
												cursor="pointer"
												onClick={() => addProduct(cart, product)}
												marginLeft={4}
												border="2px solid white"
												borderRadius={25}
												w="23px"
												h="23px"
												p={1}
											/>
										</Box>
									</Box>
								))}
							</Box>

							<Text fontWeight={700} fontSize={17}>{`Total: ${parseCurrency(
								cart.reduce((total, product) => total + product.price, 0)
							)}`}</Text>
						</DrawerBody>

						<DrawerFooter>
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Box marginLeft={4}>
								{!!cart.length && (
									<Button
										href={`https://wa.me/5491100000000?text=${encodeURIComponent(
											orderText
										)}`}
										isExternal
										as={Link}
										colorScheme="primary"
										leftIcon={<PhoneIcon />}
									>
										Send Order
									</Button>
								)}
							</Box>
						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};

export default CartList;
