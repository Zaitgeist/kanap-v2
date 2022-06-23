const productInCart = JSON.parse(localStorage.getItem("cart"));
const productInApi = "http://localhost:3000/api/products/";
const cartContainer = document.getElementById("cart__items");
const priceTotal = document.getElementById("totalPrice")
const totalQuantity = document.getElementById("totalQuantity")

async function generateDOM() {
  if (productInCart == 0) {
  } else {
    for (let i = 0; i < productInCart.length; i++) {
      const products = productInCart[i]
      await fetch("http://localhost:3000/api/products/" + products.id)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (productInfo) {

          const productCartArticle = document.createElement("article");
          cartContainer.appendChild(productCartArticle);
          productCartArticle.className = "cart__item";
          productCartArticle.setAttribute("data-id", products.id);
          productCartArticle.setAttribute("data-color", products.color);

          ///img
          const productImgContainer = document.createElement("div");
          const productImg = document.createElement("img");
          const productItemContainer = document.createElement("div");
          productCartArticle.append(productImgContainer, productItemContainer);
          productImgContainer.className = "cart__item__img";
          productImgContainer.appendChild(productImg);
          productImg.src = productInfo.imageUrl;


          ///desc
          const productItemDescription = document.createElement("div");
          const productTitle = document.createElement("h2");
          const productColor = document.createElement("p");
          const productPrice = document.createElement("p");
          productItemDescription.append(productTitle, productColor, productPrice);
          productTitle.textContent = productInfo.name
          productColor.textContent = products.color
          productPrice.textContent = productInfo.price + "€";


          const productItemSettings = document.createElement("div");
          const productItemSettingsQuantity = document.createElement("div");
          const productQuantity = document.createElement("p");
          const productInputQuantity = document.createElement("input");
          const productItemDelete = document.createElement("div")
          const productDelete = document.createElement("p")
          productItemContainer.append(productItemDescription, productItemSettings, productItemDelete);
          productItemContainer.className = "cart__item__content";

          productItemSettings.className = "cart__item__content__settings";
          productItemSettings.append(productItemSettingsQuantity);
          productItemSettingsQuantity.className = "cart__item__content__settings__quantity";
          productItemSettings.append(productQuantity, productInputQuantity)
          productQuantity.innerHTML = "Qté :"
          productInputQuantity.className = "itemQuantity";
          productInputQuantity.type = "number";
          productInputQuantity.name = "itemQuantity";
          productInputQuantity.min = "1";
          productInputQuantity.max = "100";
          productInputQuantity.value = products.quantity;

          productItemDelete.className = ("cart__item__content__settings__delete");
          productItemDelete.appendChild(productDelete)
          productDelete.className = "deleteItem";
          productDelete.innerHTML = "Supprimer";
        }
        )
    }
    qtyChange()
    totalPrc()
  }
}
generateDOM();
//////////////
//totalqty
function qtyTotal() {
  const totalQuantityValue = productInCart.reduce((total, productInCart) => total + parseInt(productInCart.quantity), 0)
  totalQuantity.textContent = totalQuantityValue
}
qtyTotal();



//totalprice
function totalPrc() {
  let totalPrice = 0
  for (let i = 0; i < productInCart.length; i++) { //Quentin : i+=1 peut se simplifier avec i++
    totalPrice += productInfo.price * parseInt(products.quantity)
    console.log(totalPrice) //Quentin : ha il y a un piège ici, on en parle demain ;) 
    //indice : le javascript à un typage 'dynamique', c'est à dire que le moteur du javascript "décide tout seul comme un grand" le type des entités et les conversions à la volé (mais parfois, pas celle souhaité).             
    priceTotal.textContent = totalPrice;
  }
}
totalPrc();

//change
function qtyChange() {
  productInputQuantity.addEventListener("change", (event) => {
    if (localStorage.getItem("cart")) {
      if (products !== -1) {
        products.quantity = productInputQuantity.value;
        if (products.quantity > 100) {
          alert("Vous avez dépassé le maximum autorisé de ce type de produit dans votre panier et celui ci a été modifié")
          products.quantity = 100
        }
        if (products.quantity < 0) {
          alert("Le nombre minimum de produit dans votre panier est de 1")
          products.quantity = 1
        }
      }
      localStorage.setItem('cart', JSON.stringify(productInCart));
    }
    qtyTotal()
    totalPrc()
  }
  )
}
qtyChange();

//delete
function deleteProduct() {
  for (let i = 0; i < productInCart.length; i++) {
    productDelete.addEventListener("click", (event) => {
      if (products.id == productInfo._id) { //Quentin : c'est un peu redondant non ? Et ça pète des erreurs consoles
        cartContainer.removeChild(productCartArticle);
        productInCart.splice(i, 1);
      }
      localStorage.setItem('cart', JSON.stringify(productInCart));
      totalPrc()
      qtyTotal()
    }
    )
  }
}
deleteProduct();




///
/*

getTotalPrice = () => {
  
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach(product => {
    fetch(productInApi + product.id)
      .then(res => res.json())
      .then(
        apiRes => {
          let totalProductPrice = product.quantity * apiRes.price;
        }
      )
  });
}

Attendre la fin de l'execution de la boucle pour récupérer la valeur de totalPrice (Promesse ????) 

getTotalPrice();
sum.push(productInfo.price * products.quantity);
    for (let i = 0; i < sum.length; i++) {
    const totalPriceSum = sum[i]
    totalValue += totalPriceSum
 let totalPrice = 0;
    for (let i = 0; i < productInCart.length; i++) { //Quentin : i+=1 peut se simplifier avec i++
      totalPrice += productInfo.price * parseInt(products.quantity)
      console.log(totalPrice) //Quentin : ha il y a un piège ici, on en parle demain ;) 
      //indice : le javascript à un typage 'dynamique', c'est à dire que le moteur du javascript "décide tout seul comme un grand" le type des entités et les conversions à la volé (mais parfois, pas celle souhaité).             
      priceTotal.textContent = totalPrice;
    }
    for (let i = 0; i < productInCart.length; i++) { //Quentin : i+=1 peut se simplifier avec i++
      priceTotal.textContent = productInfo.price * parseInt(products.quantity)
      console.log(totalPrice) //Quentin : ha il y a un piège ici, on en parle demain ;) 
      //indice : le javascript à un typage 'dynamique', c'est à dire que le moteur du javascript "décide tout seul comme un grand" le type des entités et les conversions à la volé (mais parfois, pas celle souhaité).             
    }
   /*  let totalValue = 0;
    sum.push(product.price * dataCart.quantity);
    for (let i = 0; i < sum.length; i++) {
    const totalPriceSum = sum[i]
    totalValue += totalPriceSum
    console.log(totalValue)
    }
     sum.push(product.price * dataCart.quantity);
    sum.forEach((totalPriceValue) => {
      console.log(totalPriceValue)
      totalValue += totalPriceValue;
      totalPrice.textContent = totalValue;
    }
    /*
/*
  function quantityChange() {
    
      quantityTotal()
      priceTotal()
    }
    )
  }
  quantityChange();

  function productDeleteFct() {
    
        quantityChange()
        quantityTotal()
        priceTotal()
      }
      )
    }
  }
  productDeleteFct();

 

  */



function orderForm() {

  const order = document.getElementById('order');
  const firstName = document.getElementById("firstName");
  const errorFirstName = document.getElementById("firstNameErrorMsg");
  const lastName = document.getElementById("lastName");
  const errorLastName = document.getElementById("lastNameErrorMsg");
  const address = document.getElementById("address");
  const errorAddress = document.getElementById("addressErrorMsg");
  const city = document.getElementById("city");
  const errorCity = document.getElementById("cityErrorMsg");
  const email = document.getElementById("email")
  const errorEmail = document.getElementById("emailErrorMsg");

  const regexName = /[\w.']{2,}(\s[\w.']{2,})/;
  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
  const regexCity = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
  const regexEmail = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/;

  firstName.addEventListener("input", () => {
    if (regexName.test(firstName.value) == false) {
      errorFirstName.innerHTML = "Veuillez saisir un prénom valable";
    }
  });

  lastName.addEventListener("input", () => {
    if (regexName.test(lastName.value) == false) {
      errorLastName.innerHTML = "Veuillez saisir un nom valable";
    }
  });

  address.addEventListener("input", () => {
    if (regexAddress.test(address.value) == false) {
      errorAddress.innerHTML = "Veuillez saisir une adresse valable";
    }
  });

  city.addEventListener("input", () => {
    if (regexCity.test(city.value) == false) {
      errorCity.innerHTML = "Veuillez saisir une ville valable";
    }
  });

  email.addEventListener("input", () => {
    if (regexEmail.test(email.value) == false) {
      errorEmail.innerHTML = "Veuillez saisir un mail valable";
    }
  });
}
orderForm();


























