// on récupére notre cart depuis le localstorage et on le converti du format JSON en objet JS // getting product info present in the cart from the local storage and parsing it
const productInCart = JSON.parse(localStorage.getItem('cart'));
// on déclare notre api // declaring our api
const productInApi = 'http://localhost:3000/api/products/';
const cartContainer = document.getElementById('cart__items');
const priceTotal = document.getElementById('totalPrice');
const totalQuantity = document.getElementById('totalQuantity');

const cartText = document.getElementById('cartAndFormContainer');
const cartTitle = cartText.querySelector('h1');
const cartSection = cartText.querySelector('section');

// on crée une fonction pour génerer le DOM // function that generate the DOM
function generateDOM() {
	// on vérifie que ni le localstorage ni le cart soit vide sinon on modifie le dom et return // check that neither the cart nor the localstorage is empty modifying the DOM if it is
	if (productInCart == null || productInCart == 0) {
		cartTitle.textContent = 'Votre panier est VIDE';
		cartText.removeChild(cartSection);
		return;
	} else {
		// on boucle sur la taille de notre cart // loop on cart length
		for (let i = 0; i < productInCart.length; i++) {
			const products = productInCart[i];
			// on fetch de notre api + l'id de chaque produits récupérées // fetch the api adding each product id
			fetch('http://localhost:3000/api/products/' + products.id)
				.then(function (res) {
					if (res.ok) {
						return res.json();
					}
				})
				.then(function (productInfo) {
					// on construit notre dom avec les informations récupérées // generate the DOM with the response
					const productCartArticle = document.createElement('article');
					cartContainer.appendChild(productCartArticle);
					productCartArticle.className = 'cart__item';
					productCartArticle.setAttribute('data-id', products.id);
					productCartArticle.setAttribute('data-color', products.color);

					///img
					const productImgContainer = document.createElement('div');
					const productImg = document.createElement('img');
					const productItemContainer = document.createElement('div');
					productCartArticle.append(productImgContainer, productItemContainer);
					productImgContainer.className = 'cart__item__img';
					productImgContainer.appendChild(productImg);
					productImg.src = productInfo.imageUrl;

					///desc
					const productItemDescription = document.createElement('div');
					const productTitle = document.createElement('h2');
					const productColor = document.createElement('p');
					const productPrice = document.createElement('p');
					productItemDescription.append(productTitle, productColor, productPrice);
					productTitle.textContent = productInfo.name;
					productColor.textContent = products.color;
					productPrice.textContent = productInfo.price + '€';

					const productItemSettings = document.createElement('div');
					const productItemSettingsQuantity = document.createElement('div');
					const productQuantity = document.createElement('p');
					const productInputQuantity = document.createElement('input');
					const productItemDelete = document.createElement('div');
					const productDelete = document.createElement('p');
					productItemContainer.append(productItemDescription, productItemSettings, productItemDelete);
					productItemContainer.className = 'cart__item__content';
          			productItemDelete.className = 'cart__item__content__settings__delete';
					productItemDelete.appendChild(productDelete);
					productDelete.className = 'deleteItem';
					productDelete.innerHTML = 'Supprimer';

          			productItemSettings.className = 'cart__item__content__settings';
					productItemSettings.append(productItemSettingsQuantity);
					productItemSettingsQuantity.className = 'cart__item__content__settings__quantity';
					productItemSettings.append(productQuantity, productInputQuantity);
					productQuantity.innerHTML = 'Qté :';
					productInputQuantity.className = 'itemQuantity';
					productInputQuantity.type = 'number';
					productInputQuantity.name = 'itemQuantity';
					productInputQuantity.min = '1';
					productInputQuantity.max = '100';
					productInputQuantity.value = products.quantity;

					// on écoute le bouton supprimer au clique // listening for click on button
					productDelete.addEventListener('click', () => {
							// on cible bien que l'id dans le localstorage correspond bien a l'id du produit actuel // targetting the corresponding product in localstorage
							if (products.id == productInfo._id) {
								// puis on supprime la div qui contient le produit et on splice le produit du cart // splice product from cart and modifying the DOM accordingly 
								cartContainer.removeChild(productCartArticle);
								productInCart.splice(i, 1);
							}
							// on met a jour a le cart et on recalcul le prix et la quantité total // updating cart and refreshing total priceand quantity total
							localStorage.setItem('cart', JSON.stringify(productInCart));
							totalPrc();
							qtyTotal();
							// si le panier est vide on regénere le DOM // then if the cart is empty rerun the generateDOM function
							if (productInCart == 0) {
							generateDOM();
							}	
				});

					// on écoute la valeur de la quantité du produit // listening for value change
					for (let i = 0; i < productInCart.length; i++) {
					productInputQuantity.addEventListener('change', () => {
						// si la quantité dans le cart est différente de celle de notre valeur alors on la modifie // if product quantity in cart is different from the input value modify it
						if (localStorage.getItem('cart')) {
							if (products !== -1) {
								products.quantity = productInputQuantity.value;
								// si la quantité total du produit devait dépasser le maximum de 100 on le réduit tacitement à 100 + alert // if input quantity is over 100 fix it to 100 and alert 
								if (products.quantity > 100) {
									alert(
										'Vous avez dépassé le maximum autorisé de ce type de produit dans votre panier et celui ci a été modifié'
									);
									products.quantity = 100;
								}
								// si la quantité total du produit devait etre inférieur a 1 on l'augmente tacitement à 1 + alert // if input quantity would be under 1 fix it to 1 and alert
								if (products.quantity < 1) {
									alert('Le nombre minimum de produit dans votre panier est de 1');
									products.quantity = 1;
								}
							}
							// on met a jour a le cart et on recalcul le prix et la quantité total // update cart and update price and quantity
							localStorage.setItem('cart', JSON.stringify(productInCart));
						}
						qtyTotal();
						totalPrc();
					});
				}});
		}
	}
}
generateDOM();

//////////////

//on revérifie que notre cart et localstorage n'est pas vide // check if cart and localstorage is empty
function qtyTotal() {
	if (productInCart == null || productInCart == 0) {
		return;
	} else {
		// ici reduce fonctionne comme une boucle for, on additionne toutes les quantités dans le cart pour arriver a une seule valeur // reduce on all the quantity in the cart
		const totalQuantityValue = productInCart.reduce(
			(total, productInCart) => total + parseInt(productInCart.quantity),
			0
		);
		totalQuantity.textContent = totalQuantityValue;
	}
}
qtyTotal();

//on revérifie que notre cart et localstorage n'est pas vide // check if cart and localstorage is empty 
function totalPrc() {
	if (productInCart == null || productInCart == 0) {
		return;
	} else {
		let totalPrice = 0;
		// on boucle sur la taille de notre cart // loop on cart length
		for (let i = 0; i < productInCart.length; i++) {
			const products = productInCart[i];
			// on fetch nos produits depuis l'api + l'id du produit //  fetch the api adding each product id
			fetch('http://localhost:3000/api/products/' + products.id)
				.then(function (res) {
					if (res.ok) {
						return res.json();
					}
				})
				.then(function (productInfo) {
					// calcul du prix total, prix du produit dans l'api multiplié par la quantité dans le cart additionné  // calculating total price by multiplying product price in api with product in cart quantity
					totalPrice += productInfo.price * parseInt(products.quantity);
					priceTotal.textContent = totalPrice;
				});
		}
	}
}
totalPrc();

// fonction pour le formulaire de contact et le bouton order // function for contact form and order button
function orderForm() {
	//on revérifie que notre cart et localstorage n'est pas vide // check if cart and localstorage is empty
	if (productInCart == null || productInCart == 0) {
		return;
	} else {
		// on cible les élements du DOM // targetting DOM element
		const orderBtn = document.getElementById('order');
		const firstName = document.getElementById('firstName');
		const errorFirstName = document.getElementById('firstNameErrorMsg');
		const lastName = document.getElementById('lastName');
		const errorLastName = document.getElementById('lastNameErrorMsg');
		const address = document.getElementById('address');
		const errorAddress = document.getElementById('addressErrorMsg');
		const city = document.getElementById('city');
		const errorCity = document.getElementById('cityErrorMsg');
		const email = document.getElementById('email');
		const errorEmail = document.getElementById('emailErrorMsg');

		window.addEventListener('load', () =>{
			errorFirstName.textContent = 'Veuillez saisir un prénom';
			errorLastName.textContent = 'Veuillez saisir un nom';
			errorAddress.textContent = 'Veuillez saisir une adresse';
			errorCity.textContent = 'Veuillez saisir une ville';
			errorEmail.textContent = 'Veuillez saisir un mail';
		});

		// on déclare les REGEX // declaring all our regex
		const regexName = /^[a-zA-ZÀ-ÿ][-,a-z. ']*$/;
		const regexAddress = /^[a-zA-Z0-9-, ']+$/;
		const regexCity = /^[a-zA-Z-, ']+$/;
		const regexEmail = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/;

		// on écoute les divers champs du formulaire et on teste si leurs valeurs ont une correspondance avec leur regex si ce n'est pas le cas on affiche une erreur // listening form input for regex correspondance if none display an error
		firstName.addEventListener('input', () => {
			if (regexName.test(firstName.value ) == false ) {
				errorFirstName.textContent = 'Veuillez saisir un prénom';
			} else {
				errorFirstName.textContent = '';
			}
		});

		lastName.addEventListener('input', () => {
			if (regexName.test(lastName.value) == false ) {
				errorLastName.textContent = 'Veuillez saisir un nom';
			} else {
				errorLastName.textContent = '';
			}
		});

		address.addEventListener('input', () => {
			if (regexAddress.test(address.value ) == false ) {
				errorAddress.textContent = 'Veuillez saisir une adresse valable';
			} else {
				errorAddress.textContent = '';
			}
		});

		city.addEventListener('input', () => {
			if (regexCity.test(city.value) == false ) {
				errorCity.textContent = 'Veuillez saisir une ville';
			} else {
				errorCity.textContent = '';
			}
		});

		email.addEventListener('input', () => {
			if (regexEmail.test(email.value) == false ) {
				errorEmail.textContent = 'Veuillez saisir un mail valable';
			} else {
				errorEmail.textContent = '';
			}
		});

		// on écoute le bouton order et on empéche sa fonction d'origine de fonctionner // lsitening for a click on order button and preventing its defautl function
		orderBtn.addEventListener('click', (e) => {
			e.preventDefault();

			// on verifie que le texte dans les champs du formulaire ont tous une correspondance avec nos regex si ce n'est pas le cas alert et return // testing the value in the form if one doesnt correspond alert and return
			if (
				regexName.test(firstName.value) == false ||
				regexName.test(lastName.value) == false ||
				regexAddress.test(address.value) == false ||
				regexCity.test(city.value) == false ||
				regexEmail.test(email.value) == false
			) {
				alert('Veuillez renseigner correctement le formulaire de contact');
				return;
			} else {
				// si ca correspond on crée un objet qui contient les valeurs récuperées depuis le formulaire // if its ok  create an object with form value in it
				let contact = {
					firstName: firstName.value,
					lastName: lastName.value,
					address: address.value,
					city: city.value,
					email: email.value,
				};
				// on déclare que products est un array vide et on push l'id de chaque produit dans le cart dans celui ci // declaring an empty array and pushing the id of each product in the cart
				let products = [];
				productInCart.forEach((product) => {
					products.push(product.id);
				});
				// on stock les 2 variable precedente dans un objet // putting both contact and products inside an object
				let orderContent = { contact, products };

				// on utilise la requete POST sur l'API FETCH et on ajoute dans notre requête notre objet encodé en JSON string // using fetch post and adding the object in JSON string
				fetch('http://localhost:3000/api/products/order', {
					method: 'POST',
					body: JSON.stringify(orderContent),
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}) // on récupére ensuite la réponse de notre fetch pour générer l'id de la commande // use response to generate an order id
					.then((res) => res.json())
					.then((order) => {
						// on redirige vers la page de confirmation et on clear le localStorage // then redirect to confirmation page and clear the localstorage
						document.location.href = './confirmation.html?id=' + order.orderId;
						localStorage.clear();
					});
			}
		});
	}
}
orderForm();
