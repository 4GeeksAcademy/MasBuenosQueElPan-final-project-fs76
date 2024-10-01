const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			categories: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			
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
				    .then((response) =>{
						console.log(response.status)

							if (response.status === 200) {
								// actions.getProducers()
								const newProducer = { email, password };
								setStore({
									producers: [...store.producers, newProducer],
								});
							}
							return response.json()
						})
						.then(data => {
							console.log(data)
						})
					
				    .catch((error) => console.error("Error during signup:", error))
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
				fetch(process.env.BACKEND_URL + "/api/producer", requestOptions)
				.then((response) => {
					console.log(response.status);
					if (response.status === 200) {
						return response.json()
					}
				})
				.then((data) => {
					console.log(data);
					localStorage.setItem("token", data.access_token)
				})
				.catch((error) => console.error("error while login in", error)
				)
			},

			// getProducer:(producerId) => {
			// 	fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`)
			// 	console.log(`${process.env.BACKEND_URL}/api/producer/${producerId}`)
			// 	.then((response) => {
			// 		console.log(response.status);
			// 		if (response.status === 400)
			// 			throw new error ("could not fecth the producer info")
			// 		return response.json()
			// 	})
			// 	.then((data) => {console.log(data)})
			// 	.catch((error) => console.error("error fetching producer", error))
				
			// },

			editProducer:(producerId, currentProducer, updatedInfo) => {
				const store = getStore();
				const requestOptions = {
				    method: "PUT",
				    headers: {"Content-Type": "application/json"},
				    body: JSON.stringify({...currentProducer, ...updatedInfo}),
				  };
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
				.then((response) => {
					console.log(response.status);
					if (response.status === 400) {
						throw new error ("error editing producer")
					}
					return response.json()
				})
				.then((data) => {
					console.log(data);
					const updatedProducerInfo = store.producers.map(producer => producer.id === producerId ? {...producer, ...updatedInfo} : producer);
					setStore({ producers: updatedProducerInfo})
				})
				.catch((error) => console.error("error editing producer", error)
				)
			},

			deleteProducer:(producerId) =>{
				const requestOptions = {
				    method: "DELETE",
				    headers: {"Content-Type": "application/json"},
				  };
				fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`, requestOptions)
				// console.log("deleting producer from flux")
				// console.log(`${process.env.BACKEND_URL}/api/producer/${producerId}`)
				
				.then((response) => {
					console.log(response.status);
					if (response.status === 400) {
						throw new error ("error while trying to delete in first then")
					}
					return response.json()
				})
				.then ((data) => {
					console.log(data)
				})
				.catch((error)=> console.log("error deleting producer", error)
				)
				
			},


			getProducers:() =>{
				const store = getStore()
			fetch(process.env.BACKEND_URL + "/api/producers")
			.then((response) => {
				console.log(response.status);
				if (response.status === 400) {
					throw new Error ("could not fetch producers")
				}
				return response.json()
			})
			.then((data) => {
				console.log(data);
				setStore({ producers: data })
			})
			.catch((error)=> console.error("there was an error in the process",error)
			)},
			
			


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			updateCategory: (categoryId, newName) => {
				console.log(categoryId);
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
                    console.log(result);
                    const store = getStore();
                    // Actualiza el estado local con la nueva información de la categoría
                    const updatedCategories = store.categories.map(category => 
                        category.id === categoryId ? { ...category, categorie: newName } : category
                    );
                    setStore({ categories: updatedCategories });
                })
                .catch((error) => console.error(error));
            },
    
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
