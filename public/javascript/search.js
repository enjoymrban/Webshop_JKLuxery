var searchAfter;
var jsonResponseSearch;

/* set searchVariable*/
function setSearchAfter() {
    this.searchAfter = (document.getElementById("searchField").value).toLowerCase();

}

/* load ProductsForSearch*/
function loadProductforSearch() {


    var client = new XMLHttpRequest();
    client.onload = responseHandlerSearch;
    client.open("GET", baseUrl + /products/);
    client.send();


}

function responseHandlerSearch() {

    if (this.status == 200 && this.responseText != null) {   /*status 200 bedeutet ok*/
        jsonResponseSearch = JSON.parse(this.responseText);


    } else {

    	console.log("products couldn't be load from the webserver");


    }

}


/* create SearchPage inside the page the search was initiated*/
function search() {

    document.getElementById("content").innerHTML = "";
    document.getElementById("wrapper").setAttribute("class", "backgroundImage");



    var h2ContNode = document.createElement("h2");
    document.getElementById("content").appendChild(h2ContNode);


    var hrNode = document.createElement("hr");
    document.getElementById("content").appendChild(hrNode);



    if (searchAfter === "" || typeof searchAfter === "undefined") {
        h2ContNode.innerHTML = "Kein Suchbegriff eingegeben";



    } else {
        h2ContNode.innerHTML = "Suchergebnisse f&uuml;r " + searchAfter;


        var containerNode = document.createElement("div");
        containerNode.setAttribute("class", "container-fluid");

        var rowNode = document.createElement("div");
        rowNode.setAttribute("class", "row");
        rowNode.setAttribute("id", "products");
        containerNode.appendChild(rowNode);


        document.getElementById("content").appendChild(containerNode);


        createProducts();
    }





}

/* searches the produts after, Category, title, description*/
function createProducts(){

    var arrayPos = 0;

    while (arrayPos < jsonResponseSearch.length) {


        if (jsonResponseSearch[arrayPos].category.toLowerCase().search(searchAfter) > -1|| jsonResponseSearch[arrayPos].title.toLowerCase().search(searchAfter) > -1 || jsonResponseSearch[arrayPos].description.toLowerCase().search(searchAfter) > -1) {

            createCardforSearch(jsonResponseSearch[arrayPos].id);
            createRatingsforSearch(jsonResponseSearch[arrayPos].id);
            arrayPos++;

        } else {
            arrayPos++;
        }
    }


}

/* creates Cards with the productes that passed the search*/

function createCardforSearch(idCard) {

    var divNodeResponsive = document.createElement("div");
    divNodeResponsive.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 col-xl-3");

    var cardNode = document.createElement("div");
    cardNode.setAttribute("class", "card");


    var aImgNode = document.createElement("a")
    aImgNode.setAttribute("href", "/kategorien/produkte/produktdetail.html?id=" + idCard.toString());



    var imgNode = document.createElement("img");
    imgNode.setAttribute("class", "card-img-top img-fluid");
    imgNode.setAttribute("src", "/kategorien/produkte/" + jsonResponseSearch[idCard - 1].image);
    imgNode.setAttribute("alt", "Produkt: " + idCard.toString());


    var divBodyNode = document.createElement("div");
    divBodyNode.setAttribute("class", "card-body");

    var aNode = document.createElement("a");
    aNode.setAttribute("href", "/kategorien/produkte/produktdetail.html?id=" + idCard.toString());

    var h4Node = document.createElement("h4");
    h4Node.setAttribute("class", "card-title");
    h4Node.innerHTML = jsonResponseSearch[idCard - 1].title;

    aNode.appendChild(h4Node);

    var textNode = document.createElement("p");
    textNode.setAttribute("class", "card-text");
    textNode.innerHTML = jsonResponseSearch[idCard - 1].description;

    var priceNode = document.createElement("p");
    priceNode.innerHTML = "Preis: " + jsonResponseSearch[idCard - 1].price.value + "  " +jsonResponseSearch[idCard-1].price.currency;

    var aRezNode = document.createElement("a");
    aRezNode.setAttribute("href", "/kategorien/produkte/produktdetail.html?id=" + idCard.toString());

    var rezNode = document.createElement("p");
    rezNode.innerHTML = "Rezensionen: ";

    var ratingCountNumberNode = document.createElement("span");
    ratingCountNumberNode.setAttribute("id", "rating" + idCard.toString());


    var ratingStarNode = document.createElement("span");
    ratingStarNode.setAttribute("id", "ratingStar" + idCard.toString());

    var star5Node = document.createElement("span");
    star5Node.setAttribute("class", "star5");
    star5Node.innerHTML = "&#9734;";
    ratingStarNode.appendChild(star5Node);

    var star4Node = document.createElement("span");
    star4Node.setAttribute("class", "star4");
    star4Node.innerHTML = "&#9734;";
    ratingStarNode.appendChild(star4Node);

    var star3Node = document.createElement("span");
    star3Node.setAttribute("class", "star3");
    star3Node.innerHTML = "&#9734;";
    ratingStarNode.appendChild(star3Node);

    var star2Node = document.createElement("span");
    star2Node.setAttribute("class", "star2");
    star2Node.innerHTML = "&#9734;";
    ratingStarNode.appendChild(star2Node);

    var star1Node = document.createElement("span");
    star1Node.setAttribute("class", "star1");
    star1Node.innerHTML = "&#9734;";
    ratingStarNode.appendChild(star1Node);

    var aShoppingNode = document.createElement("a");
    aShoppingNode.setAttribute("href", "/einkaufswagen/einkaufswagen.html");
    aShoppingNode.setAttribute("onclick", "addToCartFromCategory("+idCard.toString()+")");
    aShoppingNode.setAttribute("class", "btn btn-primary");
    aShoppingNode.innerHTML = "In den Einkaufswagen";


    rezNode.appendChild(ratingCountNumberNode);
    rezNode.appendChild(ratingStarNode);
    divBodyNode.appendChild(aNode);
    divBodyNode.appendChild(textNode);
    divBodyNode.appendChild(priceNode);
    aRezNode.appendChild(rezNode);
    divBodyNode.appendChild(aRezNode);
    divBodyNode.appendChild(aShoppingNode);
    aImgNode.appendChild(imgNode);
    cardNode.appendChild(aImgNode);
    cardNode.appendChild(divBodyNode);
    divNodeResponsive.appendChild(cardNode);

    document.getElementById("products").appendChild(divNodeResponsive);

}

/* creates the ratings number*/
function createRatingsforSearch(id) {
    this.id = id;

    document.getElementById("rating" + id.toString()).innerHTML = "(" + (jsonResponseSearch[id - 1].reviews.length).toString() + ")     ";
    numberOfStarsforSearch();


}

/* creates the ratings stars*/
function numberOfStarsforSearch() {
    var totalNumberOfStars = 0;
    var numberOfStars1;

    for (var a = 0; a < jsonResponseSearch[id - 1].reviews.length; a++) {

        totalNumberOfStars += jsonResponseSearch[id - 1].reviews[a].stars;


    }
    numberOfStars1 = Math.round(totalNumberOfStars / jsonResponseSearch[id - 1].reviews.length);

    if (isNaN(numberOfStars1)) {

        numberOfStars1 = 0;

    }
    generateStars(numberOfStars1);


}


function generateStars(numberOfStars1) {


    switch (numberOfStars1) {


        case 0:
            document.querySelector("#ratingStar" + id.toString() + " .star5").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star4").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star3").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star2").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star1").innerHTML = "";

            break;

        case 1:
            document.querySelector("#ratingStar" + id.toString() + " .star5").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star4").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star3").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star2").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star1").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star1").setAttribute("class", "staryellow");
            break;

        case 2:
            document.querySelector("#ratingStar" + id.toString() + " .star5").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star4").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star3").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star2").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star2").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star1").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star1").setAttribute("class", "staryellow");

            break;

        case 3:
            document.querySelector("#ratingStar" + id.toString() + " .star5").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star4").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star3").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star3").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star2").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star2").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star1").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star1").setAttribute("class", "staryellow");
            break;

        case 4:
            document.querySelector("#ratingStar" + id.toString() + " .star5").innerHTML = "";
            document.querySelector("#ratingStar" + id.toString() + " .star4").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star4").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star3").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star3").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star2").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star2").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star1").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star1").setAttribute("class", "staryellow");
            break;

        case 5:


            document.querySelector("#ratingStar" + id.toString() + " .star5").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star5").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star4").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star4").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star3").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star3").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star2").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star2").setAttribute("class", "staryellow");
            document.querySelector("#ratingStar" + id.toString() + " .star1").innerHTML = "&#9733;";
            document.querySelector("#ratingStar" + id.toString() + " .star1").setAttribute("class", "staryellow");
            break;
    }


}






window.onload = loadProductforSearch();