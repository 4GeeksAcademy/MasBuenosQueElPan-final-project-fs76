const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			products: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			producers: [],
			categories: [],
			cart_items: [],
			customer_carts: [],  // Inicializado como un arreglo vacío
			user: {
				id: "123",  // Cambia esto al ID del usuario real
				name: "Usuario Test"
			},
		},
		actions: {
			// Ejemplo de una función que cambia el color
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Manejo de productos
			getProducts: () => {
				const requestOptions = { method: "GET" };
				fetch(process.env.BACKEND_URL + "/api/product", requestOptions)
					.then((response) => response.json())
					.then((data) => setStore({ products: data }));
			},

			modifyProduct: (newProductInfo) => {
				const raw = JSON.stringify({
					"description": newProductInfo.description,
					"name": newProductInfo.name,
					"origin": newProductInfo.origin,
					"price": newProductInfo.price
				});
				const requestOptions = {
					method: "PUT",
					headers: { "Content-type": "application/json" },
					body: raw
				};
				fetch(`${process.env.BACKEND_URL}/api/product/${newProductInfo.id}`, requestOptions)
					.then((response) => response.json())
					.then(() => getActions().getProducts());
			},

			deleteProduct: (id) => {
				const requestOptions = { method: "DELETE" };
				fetch(`${process.env.BACKEND_URL}/api/product/${id}`, requestOptions)
					.then((response) => response.text())
					.then(() => getActions().getProducts())
					.catch((error) => console.error(error));
			},

			addProducts: (newProduct) => {
				const raw = JSON.stringify({
					"origin": newProduct.origin,
					"description": newProduct.description,
					"name": newProduct.name,
					"price": newProduct.price
				});
				const requestOptions = {
					method: "POST",
					body: raw,
					headers: { "Content-type": "application/json" }
				};
				fetch(process.env.BACKEND_URL + "/api/product", requestOptions)
					.then((response) => response.json())
					.then(() => getActions().getProducts())
					.catch((error) => console.error(error));
			},

			// Manejo de categorías
			getCategories: () => {
				const requestOptions = { method: "GET" };
				fetch(process.env.BACKEND_URL + "/api/categories", requestOptions)
					.then((response) => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.json();
					})
					.then((result) => setStore({ categories: result }))
					.catch((error) => console.error("Error fetching categories:", error));
			},

			deleteCategory: (categoryId) => {
				fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}`, { method: "DELETE", headers: { "Content-Type": "application/json" } })
					.then((response) => response.json())
					.then(() => {
						const store = getStore();
						const updatedCategories = store.categories.filter(category => category.id !== categoryId);
						setStore({ categories: updatedCategories });
					})
					.catch((error) => console.error(error));
			},

			addCategory: (newCategoryName) => {
				fetch(process.env.BACKEND_URL + "/api/categories", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ "categorie": newCategoryName })
				})
					.then((response) => response.json())
					.then(() => getActions().getCategories())
					.catch((error) => console.error(error));
			},

			updateCategory: (categoryId, newName) => {
				fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ categorie: newName })
				})
					.then((response) => response.json())
					.then(() => {
						const store = getStore();
						const updatedCategories = store.categories.map(category =>
							category.id === categoryId ? { ...category, category: newName } : category
						);
						setStore({ categories: updatedCategories });
					})
					.catch((error) => console.error(error));
			},

			// Manejo de productores
			producerSignup: (email, password) => {
				const store = getStore();
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ "email": email, "password": password })
				};
				fetch(process.env.BACKEND_URL + "/api/producer/signup", requestOptions)
					.then((response) => {
						if (response.status === 200) {
							setStore({ producers: [...store.producers, { email, password }] });
						}
						return response.json();
					})
					.catch((error) => console.error("Error during signup:", error));
			},

			producerLogin: (email, password) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ "email": email, "password": password })
				};
				fetch(process.env.BACKEND_URL + "/api/producer/login", requestOptions)
					.then((response) => {
						if (response.status === 200) {
							return response.json();
						}
					})
					.then((data) => {
						localStorage.setItem("token", data.access_token);
					})
					.catch((error) => console.error("Error during login:", error));
			},

			editProducer: (producerId, updatedInfo) => {
				const store = getStore();
				const currentProducer = store.producers.find(producer => producer.id === parseInt(producerId));

				if (!currentProducer) {
					console.error("Producer not found");
					return;
				}

				const requestOptions = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...currentProducer, ...updatedInfo })
				};

				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
					.then((response) => response.json())
					.then(() => {
						const updatedProducers = store.producers.map(producer =>
							producer.id === producerId ? { ...producer, ...updatedInfo } : producer
						);
						setStore({ producers: updatedProducers });
					})
					.catch((error) => console.error("Error editing producer", error));
			},

			deleteProducer: (producerId) => {
				const requestOptions = { method: "DELETE", headers: { "Content-Type": "application/json" } };
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
					.then((response) => response.json())
					.then(() => getActions().getProducers())
					.catch((error) => console.error("Error deleting producer:", error));
			},

			getProducers: () => {
				const requestOptions = { method: "GET" };
				fetch(process.env.BACKEND_URL + "/api/producers", requestOptions)
					.then((response) => response.json())
					.then((data) => setStore({ producers: data }))
					.catch((error) => console.error(error));
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.error("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo });
			},

			// Manejo del carrito
			getCartItems: () => {
				const requestOptions = { method: "GET" };
				fetch(process.env.BACKEND_URL + "/api/cart", requestOptions)
					.then((response) => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.json();
					})
					.then((data) => {
						setStore({ cart_items: data });
					})
					.catch((error) => console.error("Error fetching cart items:", error));
			},

			addToCart: (product, quantity) => {
				const store = getStore();

				const newCartItem = {
					customer_cart_id: parseInt(store.user.id),  // Asegúrate de que este ID sea un número
					product_id: product.id,
					quantity: quantity,
					price: product.price,
				};

				fetch(`${process.env.BACKEND_URL}/api/cart`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newCartItem),
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(`Error al añadir al carrito: ${response.status} ${response.statusText}`);
						}
						return response.json();
					})
					.then(data => {
						// setStore({ cart_items: [...store.cart_items, { ...newCartItem, id: data.id }] });
						alert("Producto añadido al carrito!");
						getActions().getCartItems()
					})
					.catch(error => {
						console.error('Error añadiendo al carrito:', error);
						alert(`No se pudo añadir el producto al carrito: ${error.message}`);
					});
			},

			removeCartItem: (product_id) => {
				const requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				};

				fetch(`${process.env.BACKEND_URL}/api/cart/${product_id}`, requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error(`Error al eliminar: ${response.status} ${response.statusText}`);
						}
						return response.json(); // Suponiendo que la respuesta devuelva algún dato
					})
					.then(data => {
						const currentStore = getStore();
						const updatedCartItems = currentStore.cart_items.filter(item => item.product_id !== product_id);
						setStore({ cart_items: updatedCartItems });
						alert("Producto eliminado del carrito!");
					})
					.catch(error => {
						console.error('Error eliminando del carrito:', error);
						alert(`No se pudo eliminar el producto del carrito: ${error.message}`);
					});
			},

			saveCart: () => {
				const store = getStore();
				const cartItems = store.cart_items;

				const cartData = {
					customer_cart_id: store.user.id, // El ID del cliente
					items: cartItems.map(item => ({
						product_id: item.product_id,
						quantity: item.quantity,
						price: item.price
					}))

				};
				// getActions().getCustomerCarts()
				fetch(`${process.env.BACKEND_URL}/api/customers_cart`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(cartData),
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(`Error al guardar el carrito: ${response.statusText}`);
						}
						return response.json();
					})
					.then(data => {
						alert("Compra guardada exitosamente!");
						// Vaciar el carrito después de guardar
						getActions().getCustomerCarts()
						setStore({ cart_items: [] });
					})
					.catch(error => {
						console.error("Error al guardar el carrito:", error);
						alert(`No se pudo guardar la compra: ${error.message}`);
					});
			},

			getCustomerCarts: () => {
				const store = getStore();
				const requestOptions = { method: "GET" };
				fetch(`${process.env.BACKEND_URL}/api/customers_cart/${store.user.id}`, requestOptions)
					.then((response) => response.json())
					.then((data) => {
						setStore({ customer_carts: data });
					})
					.catch((error) => console.error("Error fetching customer carts:", error));
			},
			clearCart: () => {
				const store = getStore();
				const requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				};


				fetch(`${process.env.BACKEND_URL}/api/cart/${store.user.id}`, requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error(`Error al vaciar el carrito: ${response.statusText}`);
						}
						return response.json(); // Suponiendo que recibes una respuesta en JSON
					})
					.then(data => {
						console.log("Carrito vaciado en la base de datos:", data);
						// Ahora vaciamos el carrito en el estado del cliente
						setStore({ cart_items: [] });
						alert("El carrito ha sido vaciado.");
					})
					.catch(error => {
						console.error("Error al vaciar el carrito:", error);
						alert(`No se pudo vaciar el carrito: ${error.message}`);
					});
			}
		}
	};
};

export default getState;