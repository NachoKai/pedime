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
import { DeleteIcon, PhoneIcon } from "@chakra-ui/icons";
import { parseCurrency } from "../utils/parseCurrency";

const CartList = ({ cart, setCart }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const removeFromCart = (cart, product) =>
		setCart(cart.filter(cartProduct => cartProduct.id !== product.id));

	const orderText = useMemo(
		() =>
			cart
				.reduce(
					(message, product) =>
						message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
					``
				)
				.concat(
					`\nTotal: ${parseCurrency(
						cart.reduce((total, product) => total + product.price, 0)
					)}`
				),
		[cart]
	);

	return (
		<>
			<Box d="flex" justifyContent="center" marginTop={8} position="sticky" bottom={4}>
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
						<DrawerHeader>Cart List</DrawerHeader>

						<DrawerBody d="flex" flexDirection="column" justifyContent="space-between">
							<Box>
								{cart.map(product => (
									<Box
										key={product.id}
										d="flex"
										justifyContent="space-between"
										alignItems="center"
									>
										<Text marginY={4}>{`* ${product.title} - ${parseCurrency(
											product.price
										)}\n`}</Text>
										<DeleteIcon
											cursor="pointer"
											onClick={() => removeFromCart(cart, product)}
										/>
									</Box>
								))}
							</Box>
							<Text>{`Total: ${parseCurrency(
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
