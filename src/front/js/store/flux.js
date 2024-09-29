const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			products: [
				
			],
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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getProducts:() => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/product")
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



