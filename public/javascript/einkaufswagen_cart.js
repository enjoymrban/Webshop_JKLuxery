var jsonResponseCart;
var ProductsArray = [];
var summe=0;

var jsonResponseCartProducts;

/* empties cart completely*/
function clearCart() {
    var client = new XMLHttpRequest();
    client.onload = responseHandlerCartProducts;
    client.open("DELETE", baseUrl + /cart/);
    client.send();

}

/* decreases number of a specific product in the cart by one*/
function clearProduct(id) {
    var client = new XMLHttpRequest();
    client.onload = responseHandlerCartProducts;
    client.open("DELETE", baseUrl + /cart/+ id);
    client.send();

}

/* loads all products*/
function loadCartProducts() {
    var client = new XMLHttpRequest();
    client.onload = responseHandlerCartProducts;
    client.open("GET", baseUrl + /products/);
    client.send();
}


function responseHandlerCartProducts() {

    if (this.status == 200 && this.responseText != null) {   /*status 200 bedeutet ok*/
        jsonResponseCartProducts = JSON.parse(this.responseText);

        loadCart();
    } else {

    	console.log("products couldn't be load from the webserver");
	
    }
}

/* Load the existing cart */
function loadCart() {
        var client = new XMLHttpRequest();
        client.onload = respnseHandlerCart;
        client.open("GET", baseUrl + /cart/);
        client.send();
}

function respnseHandlerCart() {
    if (this.status === 200 && this.responseText != null) {   /*status 200 bedeutet ok*/
        jsonResponseCart = JSON.parse(this.responseText);
		
		createCart();
		
    } else {

    	console.log("cart couldn't be load from the webserver");
		
    }
}

/* creates Cart*/
function createCart(){
	//Array berechnen
	var anzahlProdukte = jsonResponseCart.length;
	
	for(var i=0; i < 20; i++){
		ProductsArray[i]=0;
	}
	
	for(var i=0; i < anzahlProdukte; i++){
		var id = jsonResponseCart[i].id
		ProductsArray[id-1] = ProductsArray[id-1]+1;
	}
	
	//Warenkorb Tabelle füllen
	for(var i=0; i < 20; i++){
		if(ProductsArray[i]!=0){
			var trNode = document.createElement("tr");
			var tdNode = document.createElement("td");

			
			//Bild
            var imgNode = document.createElement("img");
			imgNode.setAttribute('src', "../kategorien/produkte/"+jsonResponseCartProducts[i].image);
			imgNode.setAttribute('class', "rezImg")
			tdNode.appendChild(imgNode);
			trNode.appendChild(tdNode);
			document.getElementById("tableContent").appendChild(trNode);
			
			//Titel
			var tdNode = document.createElement("td");
			var tdTextNode = document.createTextNode(jsonResponseCartProducts[i].title);
			tdNode.appendChild(tdTextNode);
			trNode.appendChild(tdNode);
			document.getElementById("tableContent").appendChild(trNode);

			//Anzahl
			var tdNode = document.createElement("td");
			var tdTextNode = document.createTextNode((ProductsArray[i]).toString());
			tdNode.appendChild(tdTextNode);
			trNode.appendChild(tdNode);
			document.getElementById("tableContent").appendChild(trNode);
			
			//Preis pro Stück
			var tdNode = document.createElement("td");
			var tdTextNode = document.createTextNode(jsonResponseCartProducts[i].price.currency+ " " + jsonResponseCartProducts[i].price.value);
			tdNode.appendChild(tdTextNode);
			trNode.appendChild(tdNode);
			document.getElementById("tableContent").appendChild(trNode);
			
			//Zwischensumme
			var preisString = jsonResponseCartProducts[i].price.value;
			var preisStringOhneHochkomma = preisString.replace(/'/g,"")
			var preisFloat=  parseFloat(preisStringOhneHochkomma);
			
			var tdNode = document.createElement("td");
			var tdTextNode = document.createTextNode(jsonResponseCartProducts[i].price.currency+ " " + (floatToNiceString(ProductsArray[i]*preisFloat)));
			summe += (ProductsArray[i]*preisFloat);
			//easter egg
			if(summe>1000000000){
				clearCart();
				window.location = "../kategorien/produkte/easter_egg.html";
			}
			tdNode.appendChild(tdTextNode);
			trNode.appendChild(tdNode);
			document.getElementById("tableContent").appendChild(trNode);


            var tdNode = document.createElement("td");
            var aRemoveNode = document.createElement("a");
            aRemoveNode.setAttribute("href", "");
            aRemoveNode.setAttribute("onclick", "clearProduct("+jsonResponseCartProducts[i].id.toString()+")");

			var iNode = document.createElement("i");
			iNode.setAttribute("class", "fa fa-times fa-1x");

			aRemoveNode.appendChild(iNode);
			tdNode.appendChild(aRemoveNode);
			trNode.appendChild(tdNode)
			document.getElementById("tableContent").appendChild(trNode);
			

	
		}
	
	}
	//Preis TOTAL setzen
	document.getElementById("priceTotal").innerHTML="CHF "+ floatToNiceString(summe);
}
function floatToNiceString(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function starter(){
	loadCartProducts();
	
}
	
window.onload = starter();