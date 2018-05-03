var responseHandlerShoppingCartAddProd;


function addToCart() {
        var client = new XMLHttpRequest();
        var productToCart = {
            id: productID
        }
        client.onload = responseHandlerShoppingCartAddProd;
        client.open("POST", baseUrl + "/cart");
        client.setRequestHeader("Content-Type", "application/json");
        client.send(JSON.stringify(productToCart));
}

function addToCartFromCategory(x) {
        var client = new XMLHttpRequest();
        var productToCart = {
            id: x
        }
        client.onload = responseHandlerShoppingCartAddProd;
        client.open("POST", baseUrl + "/cart");
        client.setRequestHeader("Content-Type", "application/json");
        client.send(JSON.stringify(productToCart));
}

/* Load the existing cart */
function loadShoppingCartAddProd() {
        var client = new XMLHttpRequest();
        client.onload = responseHandlerShoppingCartAddProd;
        client.open("GET", baseUrl + /cart/);
        client.send();
}

function responseHandlerEinkaufswagen() {
    if (this.status === 200 && this.responseText != null) {   /*status 200 bedeutet ok*/
        responseHandlerShoppingCartAddProd = JSON.parse(this.responseText);
    } else {

    	console.log("cart couldn't be load from the webserver");
		
    }
}
	
window.onload = loadShoppingCartAddProd();