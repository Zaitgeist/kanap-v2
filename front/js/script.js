const api = "http://localhost:3000/api/products"

const items = document.getElementById("items");

fetch(api)
    .then(response => response.json())
    .then(data => {
        for (let product of data) {
            console.log(product)

            const article = document.createElement("article");
            const productLink = document.createElement("a");
            const productImg = document.createElement("img");
            const productTitle = document.createElement("h3");
            const productDesc = document.createElement("p");

            items.appendChild(productLink).appendChild(article);

            article.append(productImg, productTitle, productDesc);

            productLink.href = "../html/product.html?id=" + product._id;
            productImg.src = product.imageUrl;
            productImg.alt = product.altTxt;
            productTitle.setAttribute("class", "productName");
            productTitle.textContent = product.name;
            productDesc.setAttribute("class", "productDescription");
            productDesc.textContent = product.description;

            /*  
              items.innerHTML += 
              `<a href="../html/product.html?id=${product._id}">
              <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
              </article>
              </a>
  */

        }
    }
    )