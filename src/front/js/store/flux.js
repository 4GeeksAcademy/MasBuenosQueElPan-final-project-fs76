const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			products: [
				
			],
			token: null,
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
			producers: [

			],
			isFirstLogin: true,
			isLogedIn: false,
			categories: [
				
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setToken: (token) =>{
				setStore({token:token})
			},
			logOut: () => {
				setStore({token: null})
			},
			createCustomer:(newCustomer) => {
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
			getProducts:() => {
                const store = getStore();
                const requestOptions = {
                    method: "GET",
                  };
                fetch(process.env.BACKEND_URL + "/api/product", requestOptions)
                .then((response)=> response.json())
                .then((data)=> setStore({ products: data }))

            },
			modifyProduct: (newProductInfo) => {
				const myid = newProductInfo.id
				const raw = JSON.stringify({
					"description": newProductInfo.description,
					"name": newProductInfo.name,
					"origin": newProductInfo.origin,
					"price": newProductInfo.price
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
				.then((data)=> 
					getActions().getProducts()
			)
			},
			deleteProduct: (id)=>{
				const requestOptions = {
					method: "DELETE",
				  };
				  
				  fetch(`${process.env.BACKEND_URL}/api/product/${id}`, requestOptions)
					.then((response) => response.text())
					.then((result) => {console.log(result),
						getActions().getProducts()})
					.catch((error) => console.error(error));
			},
			addProducts:(newProduct) => {
                const raw = JSON.stringify({
                    "origin": newProduct.origin,
                    "description": newProduct.description,
                    "name": newProduct.name,
                    "price": newProduct.price
                  });

                  const requestOptions = {
                    method: "POST",
                    body: raw,
                    headers: {
                        "Content-type": "application/json",
                    }
                  };

                  fetch(process.env.BACKEND_URL + "/api/product", requestOptions)
                    .then((response) => response.json())
                    .then((result) => 
                        getActions().getProducts()
                    )
                    .catch((error) => console.error(error));
            },
			//Estos son categorías!!
			functionCategories: ()=>
			{	const store = getStore()
				const requestOptions = {
					method: "GET",
					
				  };
				  
				  fetch(process.env.BACKEND_URL + "/api/categories", requestOptions)
					.then((response) => response.json())
					.then((result) => {console.log (result),
						setStore({categories: result} ) }) 
					.catch((error) => console.error(error));
				
			},
			
			deleteCategory: (categoryId) => {
				console.log(categoryId);
				
                fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}`, {
                    method: "DELETE",
					headers: {"Content-Type": "application/json"},
                })
                .then((response) => {
					console.log(response.status);
					
					response.json()})
                .then((result) => {
                    console.log(result);
                    const store = getStore();
                    // Filtra las categorías eliminando la que fue borrada
                    const updatedCategories = store.categories.filter(category => category.id !== categoryId);
					console.log(updatedCategories);
					
					setStore({ categories: updatedCategories });
                })
                .catch((error) => console.error(error));
            },
			
			addCategory: (newCategoryName) => {
				fetch(process.env.BACKEND_URL + "/api/categories", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ categorie: newCategoryName })
				})
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					getActions().functionCategories();
				})
				.catch((error) => console.error(error));
			},
			updateCategory: (categoryId, newName) => {
				// console.log(categoryId);
				(categoryId)
                fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}`, {
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
                    const updatedCategories = store.categories.map(category => 
                        category.id === categoryId ? { ...category, categorie: newName } : category
                    );
                    setStore({ categories: updatedCategories });
                })
                .catch((error) => console.error(error));
            },

			//Estos son productores!!
			producerSignup: (email, password)=> {
				const store = getStore();
				const requestOptions = {
				    method: "POST",
				    headers: {"Content-Type": "application/json"},
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
							producers: [...store.producers, newProducer]});
						console.log("data from flux Signup",data);
						console.log("id from flux Signup",data.id);
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
	
			producerLogin:(email, password) => {
				const store = getStore();
				const requestOptions = {
				    method: "POST",
				    headers: {"Content-Type": "application/json"},
				    body: JSON.stringify({
				        "email": email,
				        "password": password
				        }),
				  };
				return fetch(process.env.BACKEND_URL + "/api/producer/login", requestOptions)
				.then((response) => {
					console.log(response.status);
					if (response.status === 200) {
						setStore ({ isLogedIn: true})
					} else return "Email o contraseña erróneas"
					return response.json()
				})
				.then((data) => {
					console.log("loginData from flux",data);
					localStorage.setItem("producerId", data.producer_id)
					localStorage.setItem("token", data.access_token)
					localStorage.setItem("verified", data.is_verify)
					return {isVerify:data.is_verify, producerId:data.producer_id}
				})
				.catch((error) => console.error("error while login in", error)
				)
			},
			changeFirstLogStatus: () => {
				setStore ({isFirstLogin: false})
			},
			getProducer: (producer_id) => {
				const store = getStore();
				fetch(`${process.env.BACKEND_URL}/api/producer/${producer_id}`)
					.then((response) => {
						console.log(response.status);
						if (response.status === 400) {
							throw new Error("No se ha podido obtener la información del Productor");
						}
						return response.json();
					})
					.then((data) => {
						console.log("single producer data from flux", data);
						setStore({ producers: [data] }); 
					})
					.catch((error) => console.error("there was an error in the process", error));
			},

			editProducer: (producerId, updatedInfo) => {
				const store = getStore();
				
				// Obtener el productor actual desde el estado
				const currentProducer = store.producers.find(producer => producer.id === parseInt(producerId));
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
						console.log(response.status);
						if (response.status === 400) {
							throw new Error("Error editing producer");
						}
						return response.json();
					})
					.then((data) => {
						console.log(data);
						const updatedProducerInfo = store.producers.map(producer => 
							producer.id === producerId ? { ...producer, ...updatedInfo } : producer
						);
						setStore({ producers: updatedProducerInfo });
					})
					.catch((error) => console.error("Error editing producer", error));
			},

			producerLogout: () => {
				setStore ({ isLogedIn: false})
				localStorage.removeItem("token");
			},

			addProducerInfo: (producerId, updatedInfo) => {
				const store = getStore();
				const currentProducer = store.producers.find(producer => producer.id === parseInt(producerId));
				console.log("currentProducer from flux",currentProducer);
				console.log("producerId from flux",producerId);
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
						console.log(data.id);
						const updatedProducerInfo = store.producers.map(producer => 
							producer.id === producerId ? { ...producer, ...updatedInfo } : producer
						);
						console.log(updatedProducerInfo);
						
						setStore({ producers: updatedProducerInfo });
					})
					.catch((error) => console.error("Error al editar la información del productor", error));
			},


			deleteProducer:(producerId) =>{
				const requestOptions = {
				    method: "DELETE",
				    headers: {"Content-Type": "application/json"},
				  };
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)				
				.then((response) => {
					console.log(response.status);
					if (response.status === 400) {
						throw new error ("Error al eliminar el productor")
					}
					return response.json()
				})
				.then ((data) => {
					console.log(data),
					getActions().getProducers()
				})
				.catch((error)=> console.log("No se pudo eliminar el productor", error)
				)
			},

			getProducers:() =>{
				const store = getStore()
			fetch(process.env.BACKEND_URL + "/api/producers")
			.then((response) => {
				console.log(response.status);
				if (response.status === 400) {
					throw new Error ("No se han podido obtener los productores")
				}
				return response.json()
			})
			.then((data) => {
				console.log("all prdoucers data from flux",data);
				setStore({ producers: data })
			})
			.catch((error)=> console.error("Ha habido un error al tratar de eliminar el productor",error)
			)},
			
			
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}
				catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			// updateCategory: (categoryId, newName) => {
			// 	console.log(categoryId);
			// 	(categoryId)
            //     fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}`, {
            //         method: "PUT",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({ categorie: newName })
            //     })
            //     .then((response) => response.json())
            //     .then((result) => {
            //         console.log(result);
            //         const store = getStore();
            //         // Actualiza el estado local con la nueva información de la categoría
            //         const updatedCategories = store.categories.map(category => 
            //             category.id === categoryId ? { ...category, categorie: newName } : category
            //         );
            //         setStore({ categories: updatedCategories });
            //     })
            //     .catch((error) => console.error(error));
            // },
    
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;



