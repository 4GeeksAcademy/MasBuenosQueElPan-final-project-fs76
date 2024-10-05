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
			cart_items: []
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Estos son productos
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

			// Estos son categorías
			getCategories: () => {
				const requestOptions = { method: "GET" };
				fetch(process.env.BACKEND_URL + "/api/categories", requestOptions)
					.then((response) => response.json())
					.then((result) => setStore({ categories: result }))
					.catch((error) => console.error(error));
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
					body: JSON.stringify({ categorie: newCategoryName })
				})
					.then((response) => response.json())
					.then(() => getActions().getCategories())
					.catch((error) => console.error(error));
			},

			updateCategory: (categoryId, newName) => {
				fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ category: newName })
				})
					.then((response) => response.json())
					.then(() => {
						const store = getStore();
						const updatedCategories = store.categories.map(category =>
							category.id === categoryId ? { ...category, categorie: newName } : category
						);
						setStore({ categories: updatedCategories });
					})
					.catch((error) => console.error(error));
			},

			// Estos son productores
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
				fetch(process.env.BACKEND_URL + "/api/producer", requestOptions)
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
			getCartItems: () => {
				const requestOptions = { method: "GET" };
				fetch(process.env.BACKEND_URL + "/api/cart", requestOptions)
					.then((response) => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.json();
					})
					.then((data) => setStore({ cart_items: data }))
					.catch((error) => console.error("Error fetching cart items:", error));
			},
			addToCart: (productId, quantity) => {
				const store = getStore();
				const newCartItem = { productId, quantity };
				const existingItemIndex = store.cart_items.findIndex(item => item.productId === productId);

				if (existingItemIndex > -1) {
					// Actualiza la cantidad si el producto ya está en el carrito
					const updatedItems = [...store.cart_items];
					updatedItems[existingItemIndex].quantity += quantity;
					setStore({ cart_items: updatedItems });
				} else {
					// Agrega un nuevo producto al carrito
					setStore({ cart_items: [...store.cart_items, newCartItem] });
				}
			},
		}
	};
};

export default getState;
