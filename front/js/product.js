// on récupere l'id du produit dans l'url / getting the product id from the current url
const currentUrl = window.location.href;
let url = new URL(currentUrl);
let productId = url.searchParams.get('id');

// on déclare l'url de notre API en y ajoutant l'id du produit pour fetch seulement les informations correspondantes / declaring the API url and adding the id of the product to fetch only its infos
const api = 'http://localhost:3000/api/products/' + productId;
fetch(api)
	.then((response) => response.json())
	.then((productData) => {
		// on génere le DOM pour le produit avec les informations récuperées précédemment / generating DOM with the info we get from the response
		const pagetitle = document.querySelector('title');
		pagetitle.textContent = productData.name;

		const itemImgClass = document.getElementsByClassName('item__img')[0];
		const productImg = document.createElement('img');

		itemImgClass.appendChild(productImg);

		productImg.src = productData.imageUrl;
		productImg.alt = productData.altTxt;

		const productTitle = document.getElementById('title');
		const productDesc = document.getElementById('description');
		const productPrice = document.getElementById('price');

		productTitle.textContent = productData.name;
		productDesc.textContent = productData.description;
		productPrice.textContent = productData.price;

		for (let option of productData.colors) {
			const productColors = document.getElementById('colors');
			const colorsOptions = document.createElement('option');

			productColors.appendChild(colorsOptions);
			colorsOptions.setAttribute('value', option);
			colorsOptions.textContent = option;
		}

		/////

		const productQuantity = document.getElementById('quantity');
		const colorsOptions = document.getElementById('colors');
		const addCartBtn = document.getElementById('addToCart');

		// on déclare que cart est un tableau et en meme temps on récupére le cart dans le localstorage si celui ci existe // declaring that cart is an empty array and at the same time fetching it, if it already exist
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");

		// on écoute le bouton ajouter au panier au clic // listening for click on add cart button
		addCartBtn.addEventListener('click', () => {
			// si aucune couleur n'est sélectionné alert et return // alert and return of no option is selected
			if (colorsOptions.value == '') {
				alert('Merci de selectionner une couleur !');
				return;
			} else if (productQuantity.value <= 0 || productQuantity.value > 100) { // alert and return if quantity in input is below 0 and over a 100
				// si la quantité est inférieur à 0 ou supérieur à 100 alert et return
				alert('Merci de saisir une quantité comprise entre 1 et 100');
				return;
			} else {
				// on crée une variable pour vérifier si notre produit existe déja dans notre localstorage // declaring a variable to verify if the product already exist in the cart
				let alreadyExisting = false;
				// on vérifie si dans le cart un produit avec la meme id et la meme couleur existe déja // checking if a product in the cart exist with the same color and id
				for (let i = 0; i < cart.length; i++) {
					if (cart[i].id == productData._id && cart[i].color == colorsOptions.value) {
						alreadyExisting = true;
						// si c'est le cas on met a jour la quantité en additionnant la valeur sur la page et celle dans le local storage puis une alert // if it exist add quantity value to cart value and alert
						cart[i].quantity += Number(productQuantity.value);
						alert('Votre panier a été mis a jour');
					}
					// si la quantité total du produit devait dépasser le maximum de 100 on le réduit tacitement a 100 // if product quantity would exceed a 100 set that value to 100
					if (cart[i].quantity > 100) {
						cart[i].quantity = 100;
					}
				}
				// si le produit n'existe pas alors on crée un objet qui contient les informations du produit et on push celui ci dans notre cart // if the product doent exist in the cart then create an object with the product info which we push into the cart 
				if (alreadyExisting == false) {
					let createCart = {
						id: productData._id,
						color: colorsOptions.value,
						quantity: Number(productQuantity.value),
					};
					cart.push(createCart);
					alert('Produit ajouté au panier');
				}
				// on converti notre cart en JSON et on l'ajoute au localstorage // convert cart to string and putting it in the localstorage
				localStorage.setItem('cart', JSON.stringify(cart));
			}
		});
	});
