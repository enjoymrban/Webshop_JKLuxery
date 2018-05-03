

var rating = 0;
var name = document.getElementById("rezInputName").value;
var email = document.getElementById("rezInputEmail").value;
var text = document.getElementById("rezInputText").value;
var productID = GET.id;


var form = document.getElementById('formRezension');
var jsonResponse;


/* Making sure the form is valid */

(function () {
    'use strict';

    window.addEventListener('load', function () {
        form = document.getElementById('formRezension');
        form.addEventListener('submit', function (event) {

            

            if (rating !== 0) {

                document.getElementById("star-feedback").style.display = "none";
            }
            if (form.checkValidity() === false || rating === 0 || typeof productID === "undefined") {
                event.preventDefault();
                event.stopPropagation();

                // A form has already been submited
                if (typeof productID === "undefined") {
                 document.getElementById("button-feedback").style.display = "block";


            }
            	// Rating is needed!
                if (rating === 0) {
                    document.getElementById("star-feedback").style.display = "block";
                }


            }
            form.classList.add('was-validated');
        }, false);
    }, false);
})();


/* Load Products for the "all reviews" section */
function loadProduct() {

	// submit was successful
	if (typeof productID === "undefined") {

      openRezSuc();


    }

    var client = new XMLHttpRequest();
    client.onload = responseHandler;
    client.open("GET", baseUrl + /products/);
    client.send();


}

function responseHandler() {

    if (this.status === 200 && this.responseText != null) {   /*status 200 = ok*/
        jsonResponse = JSON.parse(this.responseText);


        createTable();
        createReviewPage();


    } else {

    	console.log("products couldn't be load from the webserver")


    }

}


/* creates the ReviewPage*/
function createReviewPage() {



    if (typeof productID === "undefined") { //checkes whether the pruduct was already reviewed this time

        // nothing needs to happen (defined in html file)
    } else {


    /* shows the name the costumer is reviewing*/	
    document.getElementById("productTitle").innerHTML = "Sie schreiben eine Rezension f&uuml;r " + jsonResponse[productID-1].title;
     }
}

/* Create "all reviews" section*/

function createTable() {

    

    for (var a = 0; a < (jsonResponse.length); a++) {


        for (var b = 0; b < (jsonResponse[a].reviews.length); b++) {

            var trNode = document.createElement("tr");
            var tdNode = document.createElement("td");
            var imgNode = document.createElement("img");
            imgNode.setAttribute('src', "../kategorien/produkte/" + jsonResponse[a].image);
            imgNode.setAttribute('class', "rezImg")
            tdNode.appendChild(imgNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);

            var tdNode = document.createElement("td");
            var tdTextNode = document.createTextNode(jsonResponse[a].reviews[b].name);
            tdNode.appendChild(tdTextNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);

            var tdNode = document.createElement("td");
            var tdTextNode = document.createTextNode((jsonResponse[a].reviews[b].stars).toString());
            tdNode.appendChild(tdTextNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);

            var tdNode = document.createElement("td");
            var tdTextNode = document.createTextNode(jsonResponse[a].reviews[b].description);
            tdNode.appendChild(tdTextNode);
            trNode.appendChild(tdNode);
            document.getElementById("tableContent").appendChild(trNode);


        }


    }




}


/* Create and send a review*/

function createReview() {



    if (form.checkValidity() === true && rating != 0) {

        if(typeof jsonResponse[productID - 1] !== "undefined"){
        var client = new XMLHttpRequest();
        var review = {
            id: (jsonResponse[productID - 1].reviews.length) + 1,
            name: name,
            mail: email,
            description: text,
            stars: rating

        }
        client.onload = responseHandler;
        client.open("POST", baseUrl + "/products/" + productID + "/reviews");
        client.setRequestHeader("Content-Type", "application/json");
        client.send(JSON.stringify(review));

    }else {

        console.log("Product was already reviewed");

    }

    } else {

        console.log("Form wasn't valide");
    }


}

// onchangefunction
function setName() {


    name = document.getElementById("rezInputName").value;


}
// onchangefunction
function setEmail() {


    email = document.getElementById("rezInputEmail").value;


}
// onchangefunction
function setText() {


    text = document.getElementById("rezInputText").value;


}


/* Star rating*/

function star5() {

    rating = 5;

    document.getElementById("star5").innerHTML = "&#9733;";
    document.getElementById("star4").innerHTML = "&#9733;";
    document.getElementById("star3").innerHTML = "&#9733;";
    document.getElementById("star2").innerHTML = "&#9733;";
    document.getElementById("star1").innerHTML = "&#9733;";

    document.getElementById("star-feedback").style.display = "none";
}

function star4() {

    rating = 4;

    document.getElementById("star5").innerHTML = "&#9734;";
    document.getElementById("star4").innerHTML = "&#9733;";
    document.getElementById("star3").innerHTML = "&#9733;";
    document.getElementById("star2").innerHTML = "&#9733;";
    document.getElementById("star1").innerHTML = "&#9733;";

    document.getElementById("star-feedback").style.display = "none";
}

function star3() {

    rating = 3;

    document.getElementById("star5").innerHTML = "&#9734;";
    document.getElementById("star4").innerHTML = "&#9734;";
    document.getElementById("star3").innerHTML = "&#9733;";
    document.getElementById("star2").innerHTML = "&#9733;";
    document.getElementById("star1").innerHTML = "&#9733;";

    document.getElementById("star-feedback").style.display = "none";
}

function star2() {

    rating = 2;

    document.getElementById("star5").innerHTML = "&#9734;";
    document.getElementById("star4").innerHTML = "&#9734;";
    document.getElementById("star3").innerHTML = "&#9734;";
    document.getElementById("star2").innerHTML = "&#9733;";
    document.getElementById("star1").innerHTML = "&#9733;";

    document.getElementById("star-feedback").style.display = "none";
}

function star1() {

    rating = 1;

    document.getElementById("star5").innerHTML = "&#9734;";
    document.getElementById("star4").innerHTML = "&#9734;";
    document.getElementById("star3").innerHTML = "&#9734;";
    document.getElementById("star2").innerHTML = "&#9734;";
    document.getElementById("star1").innerHTML = "&#9733;";

    document.getElementById("star-feedback").style.display = "none";
}


/* Shows the costumer the submit was sucessful*/


// Get the modal
var modal = document.getElementById('rezSucModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


function openRezSuc() {
    modal.style.display = "block";
}


//When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

window.onload = loadProduct();

