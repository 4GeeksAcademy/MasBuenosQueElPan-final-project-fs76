const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			products: [],
			token: null,
			producerProducts: [],
			tokenProducer: null,
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
			// producerCart: [],
			producersInfo: [],
			producerCart:[
				{
					usuario: "Marcos",
					creado: "18/07/2024",
					Precio: 240,
					Estado: "Recibido"
				},
				{
					usuario: "Alicia",
					creado: "18/10/2024",
					Precio: 3800,
					Estado: "Recibido"
				},
				{
					usuario: "David",
					creado: "30/10/2024",
					Precio: 800,
					Estado: "Recibido"
				}

			],
			producerCartInfo: [
				{
					usuario: "Marcos",
					Productos: "Manzana, Pochas, Albaricoques",
					Precio: "20, 500, 700",
				}
			],
			producerIsLogedIn: false,
			customerIsLogedIn: false,
			categories: [],
			cart_items: [],
			customer_carts: [],
			user: {
				id: "123",
				name: "Usuario Test"
			},
			producers: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },
			setToken: (token) => {
				setStore({ token: token })
			},
			setTokenProducer: (token) => {
				setStore({ tokenProducer: token })
			},
			checkToken: () => {
				return new Promise((resolve, reject) => {
					const token = localStorage.getItem("token");

					if (token) {
						getActions().setToken(token); // Guarda el token en el store
						setStore({ producerIsLogedIn: true });
						resolve(true); // Resuelve la promesa cuando se establece el token
					} else {
						setStore({ producerIsLogedIn: false });
						resolve(false); // Resuelve la promesa si no hay token
					}
				});
			},
			initializeSession: () => {
				const token = localStorage.getItem("token");
				if (token) {
					setStore({ token: token, producerIsLogedIn: true });
				}
			},
			logOut: () => {
				setStore({ token: null })
			},
			updateProducerCart: (updatedCart) => {
				const store = getStore();
				setStore({
					...store,
					producerCart: updatedCart
				});
			},
			createCustomer: (newCustomer) => {
				const raw = JSON.stringify({
					"name": newCustomer.name,
					"last_name": newCustomer.last_name,
					"email": newCustomer.email,
					"password": newCustomer.password,
					"address": newCustomer.address,
					"province": newCustomer.province,
					"zipcode": newCustomer.zipcode,
					"phone": newCustomer.phone,
					"country": newCustomer.country
				});
				console.log("La información a mandar es la siguiente:", newCustomer)
				const requestOptions = {
					method: "POST",
					body: raw,
					headers: {
						"Content-type": "application/json",
					}
				};
				fetch(process.env.BACKEND_URL + "/api/customers", requestOptions)
					.then((response) => response.json())
					.then((result) =>
						console.log(result)
					)
					.catch((error) => console.error(error));
			},
			//Estos son productos!! fetch(process.env.BACKEND_URL + "/api/producers")
			// getProducts: () => {
			// 	const store = getStore();
			// 	const requestOptions = {
			// 		method: "GET",
			// 	};
			// 	fetch(process.env.BACKEND_URL + "/api/products", requestOptions)
			// 		.then((response) => response.json())
			// 		.then((data) => {
			// 			console.log("getting products", data);
						
			// 			// setStore({ products: data })
			// 		})
			// },
			getProducts: () => {
				const store = getStore()
				const requestOptions = {
					method: "GET",
				};
				fetch(process.env.BACKEND_URL + "/api/products", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log(result)
						setStore({ products: result });
					})
					.catch((error) => console.error(error));
			},
			// getProduct:(producerId) => {   //Para cuando podamos obtener los productos que haya añadido cada productor, revisar función
			// 	const requestOptions = {
			// 		method: "GET",
			// 	};
			// 	fetch(`${process.env.BACKEND_URL}/api/product?producerId=${producerId}`, requestOptions)
			// 		.then((response) => response.json())
			// 		.then((data) => setStore({ products: data }));
			// },
			modifyProduct: (updatedProduct) => {
				const store = getStore()
				const myid = updatedProduct.id
				const raw = JSON.stringify({
					"name": updatedProduct.name,
					"description": updatedProduct.description,
					"price": updatedProduct.price,
					"origin": updatedProduct.origin,
					"weight": updatedProduct.weight,
					"volume": updatedProduct.volume,
					"minimum": updatedProduct.minimum,
					"brief_description": updatedProduct.brief_description,
					"description": updatedProduct.description,
					"categorie_id": updatedProduct.categorie_id,
					"producer_id": updatedProduct.producer_id,
					"available": updatedProduct.available,
					"lastUnits": updatedProduct.lastUnits,
					"soon": updatedProduct.soon,
					"not_available": updatedProduct.not_available,
				  });
				  const requestOptions = {
					method: "PUT",
					headers: {
						"Content-type": "application/json",
					},
					body: raw,
				};
				fetch(`${process.env.BACKEND_URL}/api/product/${myid}`, requestOptions)
					.then((response) => response.json())
					.then((data) =>{
						console.log("edited product",data);
						setStore({
							producerProducts: store.producerProducts.map((product) => 
							  product.id === updatedProduct.id ? updatedProduct : product
							)
						  })
						getActions().getProducersProducts(data.producer_id)
						return;
					})
			},
			deleteProduct: (productId) => {
				console.log(productId);
				const requestOptions = {
					method: "DELETE",
				};
				fetch(`${process.env.BACKEND_URL}/api/product/${productId}`, requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log("deleted product",result);
						if (result.producer_id) {
							// Llama a obtener los productos de ese productor después de la eliminación
							getActions().getProducersProducts(result.producer_id);
						}
					})
					.catch((error) => console.error(error));
			},
			addProducts: (newProduct) => {
				const store = getStore();
				const raw = JSON.stringify({
					"name": newProduct.name,
					"origin": newProduct.origin,
					"price": newProduct.price,
					"description": newProduct.description,
					"brief_description": newProduct.brief_description || "",
					"weight": newProduct.weight,
					"volume": newProduct.volume,
					"minimum": newProduct.minimum,
					"categorie_id": newProduct.categorie_id,
					"producer_id": newProduct.producer_id,
					"available": newProduct.available,
					"lastUnits": newProduct.lastUnits,
					"soon": newProduct.soon,
					"not_available": newProduct.not_available,
				});
				console.log("raw product", raw)
				const requestOptions = {
					method: "POST",
					body: raw,
					headers: {
						"Content-type": "application/json",
					}
				};
				fetch(process.env.BACKEND_URL + "/api/product", requestOptions)
					.then((response) => {
						console.log(response.status);
						return response.json()
					})
					.then((result) => 
						{console.log("new product added", result)
						// getActions().getProducts()
						setStore({producerProducts: [...store.producerProducts, result]});
						return;
						// getActions().getProducersProducts(result.producer_id)
						}
					)
					.catch((error) => console.error(error));
			},
			// Traer los productos de cada productor
			getProducersProducts:(producerId) => {
				const store = getStore()
				console.log("producerID from flux in ProducerProducts",producerId);
				const requesOptions = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}
				}
				fetch(`${process.env.BACKEND_URL}/api/producer/product/${producerId}`, requesOptions)
				.then((response)=> {
					console.log(response.status);
					return response.json()})
				.then((data)=> {
					console.log("producer products:", data);
					setStore({...store, producerProducts: data})
				})
			},
			//Estos son categorías!!
			getCategories: () => {
				const store = getStore()
				const requestOptions = {
					method: "GET",
				};
				fetch(process.env.BACKEND_URL + "/api/images", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log("categories from flux", result)
						setStore({ categories: result });
					})
					.catch((error) => console.error(error));
			},

			deleteCategorie: (categorieId) => {
				console.log(categorieId);
				fetch(`${process.env.BACKEND_URL}/api/categories/${categorieId}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				})
					.then((response) => {
						console.log(response.status);
						response.json()
					})
					.then((result) => {
						console.log(result);
						const store = getStore();
						// Filtra las categorías eliminando la que fue borrada
						const updatedcategories = store.categories.filter(categorie => categorie.id !== categorieId);
						console.log(updatedcategories);
						setStore({ categories: updatedcategories });
					})
					.catch((error) => console.error(error));
			},
			addCategorie: (newCategorieName) => {
				const store = setStore()
				fetch(process.env.BACKEND_URL + "/api/categories", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "categorie": newCategorieName })
				})
					.then((response) => response.json())
					.then((result) => {
						{
							console.log(result),
								setStore({ categories: [...store.categories, newCategorieName] })
						};
					})
					.catch((error) => console.error(error));
			},
			updateCategorie: (categorieId, newName) => {
				// console.log(categorieId);
				// (categorieId)
				fetch(`${process.env.BACKEND_URL}/api/categories/${categorieId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ categorie: newName })
				})
					.then((response) => response.json())
					.then((result) => {
						// console.log("Respuesta de la edición", result);
						const store = getStore();
						// Actualiza el estado local con la nueva información de la categoría
						const updatedcategories = store.categories.map(categorie =>
							categorie.id === categorieId ? { ...categorie, categorie: newName } : categorie
						);
						setStore({ categories: updatedcategories });
					})
					.catch((error) => console.error(error));
			},
			//Estos son productores!!
			producerSignup: (email, password) => {
				const store = getStore();
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					}),
				};
				fetch(process.env.BACKEND_URL + "/api/producer/signup", requestOptions)
					.then((response) => {
						console.log(response.status);
						if (response.status === 201) {
							return response.json();
						}
					})
					.then(data => {
						const newProducer = { email, password, id: data.id };
						setStore({
							producers: [...store.producers, newProducer]
						});
						console.log("data from flux Signup", data);
						console.log("id from flux Signup", data.id);
						return data.id;
					})
					.catch((error) => console.error("Error during signup:", error))
			},
			checkProducerExists: (email) => {
				return fetch(process.env.BACKEND_URL + "/api/checkProducer", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body: JSON.stringify({ email })
				})
					.then(response => response.json())
					.then(data => data.exists);
			},
			producerLogin: (email, password) => {
				const store = getStore();
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					}),
				};
				return fetch(process.env.BACKEND_URL + "/api/producer/login", requestOptions)
					.then((response) => {
						console.log(response.status);
						if (response.status === 200) {
							setStore({ producerIsLogedIn: true })
						} else return "Email o contraseña erróneas"
						return response.json()
					})
					.then((data) => {
						// console.log("loginData from flux",data);
						localStorage.setItem("producerId", data.producer_id)
						localStorage.setItem("token", data.access_token)
						localStorage.setItem("verified", data.is_verify)
						localStorage.setItem("is_fill", data.is_fill)
						return { isVerify: data.is_verify, producerId: data.producer_id, is_fill: data.is_fill }
					})
					.catch((error) => console.error("error while login in", error)
					)
			},
			// Traer un productor
			getProducer: (producer_id) => {
				const store = getStore();
				fetch(`${process.env.BACKEND_URL}/api/producer/${producer_id}`)
					.then((response) => {
						// console.log(response.status);
						if (response.status === 400) {
							throw new Error("No se ha podido obtener la información del Productor");
						}
						return response.json();
					})
					.then((data) => {
						// console.log("single producer data from flux", data);
						// antes del merge----------
						setStore({ producers: [data] });
						// después del merge----------
						setStore({ producersInfo: [data] })
					})
					.catch((error) => console.error("there was an error in the process", error));
			},
			editProducer: (producerId, updatedInfo) => {
				const store = getStore();
				// const raw = JSON.stringify({
				// "name": updatedInfo.name,
				// "email": updatedInfo.email,
				// "brand_name": updatedInfo.brand_name,
				// "user_name": updatedInfo.user_name,
				// "user_last_name": updatedInfo.user_last_name,
				// "cif": updatedInfo.cif,
				// "address": updatedInfo.address,
				// "province": updatedInfo.province,
				// "zip_code": updatedInfo.zip_code,
				// "phone": updatedInfo.phone,
				//   });
				//   const requestOptions = {
				// 	method: "PUT",
				// 	headers: {
				// 		"Content-type": "application/json",
				// 	},
				// 	body: raw,
				// };
				// Si producersInfo es un objeto, no uses find
				// const currentProducer = store.producersInfo; // Accedes al objeto directamente
				// if (!currentProducer || currentProducer.id !== parseInt(producerId)) {
				// 	console.error("Producer not found");
				// 	return;
				// }
				// Obtener el productor actual desde el estado
				const currentProducer = store.producersInfo.find(producer => producer.id === parseInt(producerId));
				console.log("currentProducer in edition", currentProducer);
			
				if (!currentProducer) {
					console.error("Producer not found");
					return;
				}
				const requestOptions = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...currentProducer, ...updatedInfo }),
				};
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Error editing producer");
						}
						return response.json();
					})
					.then((data) => {
						console.log("Updated producer data from server:", data);
						setStore({ producers: [data] });
						setStore({ producersInfo: [data] });
					})
					.catch((error) => console.error("Error editing producer", error));
			},
			// editProducer: (producerId, updatedInfo) => {
			// 	const store = getStore();
			
			// 	// Obtener el productor actual desde el estado
			// 	const currentProducer = store.producersInfo.find(producer => producer.id === parseInt(producerId));
			// 	console.log("currentProducer in edition", currentProducer);
			
			// 	if (!currentProducer) {
			// 		console.error("Producer not found");
			// 		return;
			// 	}
			
			// 	const requestOptions = {
			// 		method: "PUT",
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify({ ...currentProducer, ...updatedInfo }),
			// 	};
			
			// 	fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
			// 		.then((response) => {
			// 			if (!response.ok) {
			// 				throw new Error("Error editing producer");
			// 			}
			// 			return response.json();
			// 		})
			// 		.then((data) => {
			// 			console.log("Updated producer data from server:", data);
			// 			setStore({ producersInfo: data });
			// 			// Actualizar el estado con los datos retornados por el servidor
			// 			// const updatedProducerInfo = store.producersInfo.map(producer =>
			// 			// 	producer.id === parseInt(producerId) ? data : producer
			// 			// );

			// 			// setStore({ producersInfo: updatedProducerInfo });
			// 		})
			// 		.catch((error) => console.error("Error editing producer", error));
			// },
			producerLogout: () => {
				setStore({ producerIsLogedIn: false })
				localStorage.removeItem("token");
			},
			addProducerInfo: (producerId, updatedInfo) => {
				const store = getStore();
				const currentProducer = store.producers.find(producer => producer.id === parseInt(producerId));
				console.log("currentProducer from flux", currentProducer);
				console.log("producerId from flux", producerId);
				if (!currentProducer) {
					console.error("Producer not found");
					return;
				}
				const requestOptions = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...currentProducer, ...updatedInfo }),
				};
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
				.then((response) => {
					console.log(response.status);
					if (response.status === 400) {
						throw new Error("Error al editar la información del productor");
					}
					return response.json();
				})
				.then((data) => {
					console.log("Adding producer info data",data);
					console.log(data.id);
					const updatedProducerInfo = store.producers.map(producer =>
						producer.id === producerId ? { ...producer, ...updatedInfo } : producer
					);
					console.log(updatedProducerInfo);
					setStore({ producers: updatedProducerInfo });
				})
				.catch((error) => console.error("Error al editar la información del productor", error));
			},
			deleteProducer: (producerId) => {
				const requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				};
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
					.then((response) => {
						console.log(response.status);
						if (response.status === 400) {
							throw new error("Error al eliminar el productor")
						}
						return response.json()
					})
					.then((data) => {
						console.log(data),
							getActions().getProducers()
					})
					.catch((error) => console.log("No se pudo eliminar el productor", error)
					)
			},
			getProducers: () => {
				const store = getStore()
				fetch(process.env.BACKEND_URL + "/api/producers")
					.then((response) => {
						console.log(response.status);
						if (response.status === 400) {
							throw new Error("No se han podido obtener los productores")
						}
						return response.json()
					})
					.then((data) => {
						console.log("all prdoucers data from flux", data);
						setStore({ producers: data })
					})
					.catch((error) => console.error("Ha habido un error al tratar de eliminar el productor", error)
					)
			},
			// CART FUNCTIONS
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
			//AÑADIR PRODUCTOS AL CARRITO//
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
			// ELIMINAR ITEMS DEL CARRITO
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
			//SAVE CART/
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
			//TRAER LOS CARRITOS DE UN CLIENTE
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
			// LIMPIAR CARRITO
			clearCart: () => {
				const store = getStore();
				const requestOptions = {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				};
				fetch(`${process.env.BACKEND_URL}/api/cart_item/${store.user.id}`, requestOptions)
					.then(response => {
						console.log(response.status);
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
			},
			getProducerCart: () => {
				const requestOptions = {
					method: "GET",
				}
				fetch(process.env.BACKEND_URL + "/api/products", requestOptions)
				.then((response) => response.json())
			}
		}
	};
};
export default getState;
