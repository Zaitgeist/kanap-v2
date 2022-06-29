const currentUrl = window.location.href;
let url = new URL(currentUrl);
let productId = url.searchParams.get("id");



const api = "http://localhost:3000/api/products/" + productId;
fetch(api)
    .then(response => response.json())
    .then(productData => {

        const pagetitle = document.querySelector("title");
        pagetitle.textContent = productData.name;

        const itemImgClass = document.getElementsByClassName("item__img")[0];
        const productImg = document.createElement("img");

        itemImgClass.appendChild(productImg);

        productImg.src = productData.imageUrl;
        productImg.alt = productData.altTxt;


        const productTitle = document.getElementById("title");
        const productDesc = document.getElementById("description");
        const productPrice = document.getElementById("price");

        productTitle.textContent = productData.name;
        productDesc.textContent = productData.description;
        productPrice.textContent = productData.price;



        for (let option of productData.colors) {
            const productColors = document.getElementById("colors");
            const colorsOptions = document.createElement("option");

            productColors.appendChild(colorsOptions);
            colorsOptions.setAttribute("value", option);
            colorsOptions.textContent = option;
        }

        /////
        
        const productQuantity = document.getElementById("quantity");
        const colorsOptions = document.getElementById("colors");
        const addCartBtn = document.getElementById("addToCart");
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        addCartBtn.addEventListener("click", () => {
            if (colorsOptions.value == "") {
                alert("Merci de selectionner une couleur !")
                return
            } else if (productQuantity.value <= 0 || productQuantity.value > 100) {
                alert("Merci de saisir une quantité comprise entre 1 et 100")
            } else {
                let alreadyExisting = false;
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id == productData._id  && cart[i].color == colorsOptions.value ) {
                        alreadyExisting = true;
                        cart[i].quantity += Number(productQuantity.value);
                        console.log(cart[i].quantity)
                        alert("Votre panier a été mis a jour")
                    }
                    if (cart[i].quantity > 100) {
                        cart[i].quantity = 100 
                    }
                }
                if (alreadyExisting == false) {
                let createCart = {
                    id: productData._id,
                    color: colorsOptions.value,
                    quantity: Number(productQuantity.value)
                }
                cart.push(createCart)
                alert("Produit ajouté au panier") 
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            
            /*if (cart.find(cart => cart.color === colorsOptions.value && cart.id === productData._id)) { 
                alert("caexistdejalol")
            }
*/      
        
            }
        }
        )
    }
    )

            /*localStorage.setItem(productData._id,colorsOptions.value,Number(itemQuantity.value));*/







/*
 <div class="item__img">
          <!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
        </div>

        <div class="item__content__titlePrice">
            <h1 id="title"><!-- Nom du produit --></h1>
            <p>Prix : <span id="price"><!-- 42 --></span>€</p>
          </div>

          <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>
          </div>

             <label for="color-select">Choisir une couleur :</label>
              <select name="color-select" id="colors">
                  <option value="">--SVP, choisissez une couleur --</option>
<!--                       <option value="vert">vert</option>
                  <option value="blanc">blanc</option> -->
              </select>
              */








