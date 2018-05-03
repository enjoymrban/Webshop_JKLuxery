const baseUrl = "";
//const baseUrl = "http://localhost:3000";
var sarchAfter;
var jsonResponseCartCount;


/* Get Params from the URL */
var GET = {};

var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
        continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");


}


/* Load the existing cart */
function loadCartCartCount() {
        var client = new XMLHttpRequest();
        client.onload = responseHandlerCartCount;
        client.open("GET", baseUrl + /cart/);
        client.send();
}

function responseHandlerCartCount() {
    if (this.status === 200 && this.responseText != null) {   /*status 200 bedeutet ok*/
        jsonResponseCartCount = JSON.parse(this.responseText);
		
		createCartCount();
		
    } else {

    	console.log("Cart for CartCount couldn't be load from the webserver ");
		
    }
}

/* creates number of products in cart */
function createCartCount() {

    if (typeof jsonResponseCartCount === "undefined") {

        document.getElementById("cartCount").innerHTML = " 0";

    } else {

        document.getElementById("cartCount").innerHTML = " (" + jsonResponseCartCount.length.toString() + ")";
    }


}
window.onload = loadCartCartCount();