

var productID = GET.id;
var jsonResponse;


/* Load Products for the "reviews" section */
function loadProduct(){


    if(productID >= 0){}

    var client = new XMLHttpRequest();
    client.onload = responseHandler;
    client.open("GET", baseUrl+/products/ + productID);
    client.send();

}



function responseHandler() {

    if (this.status == 200 && this.responseText != null) {   /*status 200 bedeutet ok*/
        jsonResponse = JSON.parse(this.responseText);

        createProductDetail();
        createTable();


    } else {

    console.log("Couldnt load product with ID: " + productID + " from the webserver");
    document.getElementById("product-detail-img").src = "images/notexist.jpg";

    }

}


/* create product detail page  */
function createProductDetail() {

    document.getElementById("product-detail-title").innerHTML = jsonResponse.title;
    document.getElementById("product-detail-text").innerHTML = jsonResponse.description;
    document.getElementById("product-detail-price").innerHTML =(jsonResponse.price.value).toString()+ " " +jsonResponse.price.currency;
    document.getElementById("product-detail-img").src = jsonResponse.image;
    document.getElementById("rezButton").href = "../../rezension/rezension.html?id="+productID;
	document.getElementById("addToCartBtn").className = "btn btn-primary";
	document.getElementById("rezButton").className = "btn btn-primary";
}



/* create "review section" */
function createTable() {

    if (jsonResponse.reviews.length==0){

        var trNode = document.createElement("tr");
        var tdNode = document.createElement("td");
        tdNode.setAttribute("id", "tdCol");
        var tdTextNode = document.createTextNode("Keine Rezensionen vorhanen");
        tdNode.appendChild(tdTextNode);
        trNode.appendChild(tdNode);
        document.getElementById("tableContent").appendChild(trNode);
        document.getElementById("tdCol").colSpan = "4";


    }else {


        for (var b = 0; b < (jsonResponse.reviews.length); b++) {

            var trNode = document.createElement("tr");
            var tdNode = document.createElement("td");

            var imgNode = document.createElement("img");
            imgNode.setAttribute('src', jsonResponse.image);
            imgNode.setAttribute('class', "rezImg")
            tdNode.appendChild(imgNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);

            var tdNode = document.createElement("td");
            var tdTextNode = document.createTextNode(jsonResponse.reviews[b].name);
            tdNode.appendChild(tdTextNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);

            var tdNode = document.createElement("td");
            var tdTextNode = document.createTextNode((jsonResponse.reviews[b].stars).toString());
            tdNode.appendChild(tdTextNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);

            var tdNode = document.createElement("td");
            var tdTextNode = document.createTextNode(jsonResponse.reviews[b].description);
            tdNode.appendChild(tdTextNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);


        }
    }





}

  window.onload = loadProduct();








