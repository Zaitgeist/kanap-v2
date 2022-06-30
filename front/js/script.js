// on déclare l'url de l'api
const api = 'http://localhost:3000/api/products';

const items = document.getElementById('items');

// on récupere les produits de l'api grace à fetch
fetch(api)
	.then((response) => response.json())
	.then((data) => {
		for (let product of data) {
			console.log(product);
			// on génere le DOM pour les produit avec les informations récuperées précédemment
			const article = document.createElement('article');
			const productLink = document.createElement('a');
			const productImg = document.createElement('img');
			const productTitle = document.createElement('h3');
			const productDesc = document.createElement('p');

			items.appendChild(productLink).appendChild(article);

			article.append(productImg, productTitle, productDesc);

			productLink.href = '../html/product.html?id=' + product._id;
			productImg.src = product.imageUrl;
			productImg.alt = product.altTxt;
			productTitle.setAttribute('class', 'productName');
			productTitle.textContent = product.name;
			productDesc.setAttribute('class', 'productDescription');
			productDesc.textContent = product.description;
		}
	});
