$(document).ready(function () {

    var user = {}
    var apiKey = '28a6f1595230053fe6ef116fa7e95a20'
    var appId = 'f0fdc783'
    var search = 'burgers'
    var gif = ''
    var userId = 0

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD328gUii8Uy10fO3qil4RnJehneJBSeeo",
        authDomain: "ineedarraysproj1.firebaseapp.com",
        databaseURL: "https://ineedarraysproj1.firebaseio.com",
        projectId: "ineedarraysproj1",
        storageBucket: "",
        messagingSenderId: "262274690676"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    function submitUser() {

        user = {
            name: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }

        var foodUser = database.ref().push(user);
        userId = foodUser.key
        console.log(userId)
        $("#userName").val('')
        $("#userEmail").val('')
        $("#logoNav").html("Welcome, " + user.name + "!")
    }

    $("#usersubmit").on("click", function (event) {
        event.preventDefault();
        submitUser()
    })

    function getGiphy(gif) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ANL1wBop73GYuyhDonxP9gis4JaIoV58&q=" + gif +
            "&limit=10&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
        }).then(response => {
            var results = response.data
            results.forEach(data => {
                var imageDiv = $("<div>")
                var p = $("<p>").text("rating; " + data.rating).css('text-align', 'center').css(
                    'color', 'azure');
                var gifImage = $("<img>")
                gifImage.attr("src", data.images.fixed_height.url)
                    .attr("data-still", data.images.fixed_height_still.url)
                    .attr("data-animate", data.images.fixed_height.url)
                    .attr("datastate", "still")
                    .addClass("gif")
                    .addClass("card-body")
                imageDiv.append(gifImage).append(p)
                $("#gifs-appear-here").prepend(imageDiv)
            })
        });
    }

    function searchRecipe() {
        $("#recipe-view").empty()

        var searchTerm = $("#searchTerms").val().trim();
        var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=f0fdc783&app_key=28a6f1595230053fe6ef116fa7e95a20&from=0&to=10";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
        }).then(response => {
            response.hits.forEach(function (hits) {

                var a = $("<a>")
                a.addClass("waves-effect waves-light btn-small").attr

                ({
                    dataname: hits.recipe.label,
                    href: hits.recipe.url,
                    target: "_blank"
                }).text(hits.recipe.label)

                $('#recipe-view').append(a).append("<br/>")
                // $("#recipe-view").append(hits.recipe.label + "<br>")
            })
            console.log(response.hits[0].recipe)

        });
    }

    $("#searchSubmit").on("click", function (event) {
        // alert("something")
        event.preventDefault();
        searchRecipe();
        $("#searchTerms").val('')

    })


    var randomTerms = ["vegetables", "legumes", "pork", "poultry", "beef", "rice", "quinoa", "chocolate", "yogurt", "cheese", "bread", "pasta", "fruits", "fish", "nuts"]

    function randomRecipe() {
        var num1 = Math.floor(Math.random() * randomTerms.length)
        var num2 = Math.floor(Math.random() * 20)
        var num3 = Math.floor(Math.random() * num2)

        var theRandomTerm = randomTerms[num1];
        $("#randomize-view").empty()

        console.log(theRandomTerm)
        var queryURL = "https://api.edamam.com/search?q=" + theRandomTerm + "&app_id=f0fdc783&app_key=28a6f1595230053fe6ef116fa7e95a20&from=0&to=" + num2;
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
        }).then(response => {
            // var results = response
            var foodItem = response.hits
            $("#randomize-view").append("<h3><a href=" + foodItem[num3].recipe.url + " target='_blank'>" + foodItem[num3].recipe.label + "</a></h3><br/>")

            foodItem[num3].recipe.ingredientLines.forEach(item => $("#randomize-view").append(item + "<br/>")

            )
            
        });
    }


    $("#randomize").on("click", function () {
        randomRecipe();
    })

    $('.modal').modal();
});