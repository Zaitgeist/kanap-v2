// // on récupere l'id de la commande dans l'url et on l'affiche dans le DOM
const currentUrl = window.location.href;
let url = new URL(currentUrl);
let productId = url.searchParams.get('id');
const orderId = document.getElementById('orderId');
orderId.textContent = productId;
