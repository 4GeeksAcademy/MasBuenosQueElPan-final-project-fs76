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
				  
				  fetch("https://expert-memory-66q5pvp95vj257vq-3001.app.github.dev/api/categorias", requestOptions)
					.then((response) => response.json())
					.then((result) => {console.log (result),
						setStore({categories: result} ) }) 
					.catch((error) => console.error(error));
				
			},
			
			deleteCategory: (categoryId) => {
                fetch(`https://expert-memory-66q5pvp95vj257vq-3001.app.github.dev/api/categorias/${categoryId}`, {
                    method: "DELETE"
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    const store = getStore();
                    // Filtra las categorías eliminando la que fue borrada
                    const updatedCategories = store.categories.filter(category => category.id !== categoryId);
                    setStore({ categories: updatedCategories });
                })
                .catch((error) => console.error(error));
            },
			
			addCategory: (newCategoryName) => {
				fetch("https://expert-memory-66q5pvp95vj257vq-3001.app.github.dev/api/categorias", {
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
                fetch(`https://expert-memory-66q5pvp95vj257vq-3001.app.github.dev/api/categorias/${categoryId}`, {
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
