// list variables
var germany = ''
var mexico = ''
var america = ''
var japan = ''
var france = ''
var italy = ''
$(document).ready(function () {

    var i = 0;
    var diet = null;
    var ingredients = null;
    var id = '';
    var restrictions = null;
    var caloric = null;
    var timeToCook = null;
    var searchTerm = null;
    var country = ''

//define the question variables
    function defineVariables() {
        if (i < 6) {
            $("#question").html("")
            $(".buttonAnswers").remove()
            $("#buttons-view").html("");
            newQuestions = [

                {
                    q: "Which of these gifs best describes your culinary tastes right now?",
                    answers: [],
                    parameter: searchTerms
                }, {
                    q: "What best characterizes your current diet?",
                    answers: [
                        "balanced",
                        "high-protein",
                        "high-fiber",
                        "low-fat",
                        "low-carb",
                        "low-sodium",
                    ],
                    parameter: "diet"

                }, {

                    q: "How many ingredients do you want to use?",
                    answers: ["0-5", "6-10", "11-15"],
                    parameter: "ingredients"

                }, {
                    q: "Do you have any of the following dietary restrictions?",
                    answers: ["vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "wheat-free", "fat-free", "low-sugar", "egg-free", "peanut-free", "tree-nut-free", "soy-free", "fish-free", "shellfish-free"],
                    parameter: "restrictions"

                }, {
                    q: "What is your caloric max?",
                    answers: ["0-1000", "1000-1500", "YOLO"],
                    parameter: "caloric"
                }, {
                    q: "How much time do you have to make the meal?",
                    answers: ["0-30", "30-60", "All the Time in the World"],
                    parameter: "timeToCook"
                }
            ]
            //show question
            $("#question").html("<h4>" + newQuestions[i].q + "</h4>")
            var button = $("<button>")
            //if the question isn't the gif tastic API pull
            if (newQuestions[i].answers.length !== 0) {
                for (x = 0; x < newQuestions[i].answers.length; x++) {

                    button.attr({
                        type: "button",
                        value: newQuestions[i].answers[x],
                        parameter: newQuestions[i].parameter
                    }).text(newQuestions[i].answers[x]).addClass("waves-effect waves-light light-blue btn-small buttonAnswers")
                    $("#buttons-view").append(button);

                    button = $("<button>")

                }
            } //if the 1st question, pull gif function
            else {
                gifs();

            }



        }
        i++;
    }
    defineVariables();
// assign the edamam API call parameters (diet, # of ingredients, time to cook, calories in meal, dietary restrictions)
    function checkButtonClick() {

        if ($(this).attr("parameter") == "diet") {
            diet = $(this).val();
            dietURL = "&diet=" + diet

        }
        if ($(this).attr("parameter") == "ingredients") {
            ingredients = $(this).val();
            ingredientURL = "&ingr=" + ingredients


        }
        if ($(this).attr("parameter") == "timeToCook") {
            if ($(this).val() === '0-30') {
                timeToCook = "30"
            }
            if ($(this).val() === '30-60') {
                timeToCook = "60"
            }
            if ($(this).val() === 'All the Time in the World') {
                timeToCook = "0-120"

            }
            timeToCookURL = "&time=" + timeToCook;
        }
        if ($(this).attr("parameter") == "caloric") {
            if ($(this).val() === '0-1000') {
                caloric = "1000"
            }
            if ($(this).val() === '1000-1500') {
                caloric = "1000-1500"
            }
            if ($(this).val() === 'YOLO') {
                caloric = "0-6000"
            }
            caloricURL = "&calories=" + caloric
        }
        if ($(this).attr("parameter") == "restrictions") {
            restrictions = $(this).val();
            restrictionsURL = "&healthlabels=" + restrictions;
        }

//once all 6 questions have been completed, post the recipe with the link, and the ingredients
        if (i === 6) {

            $("#question").html("");
            $("#buttons-view").html("");
            $("#next-question").remove();
            quiz();
            $("#resultsButton").on("click", function () {

            })

        }

        defineVariables();
    }
// onclick function to listen for gif click on question #1
    $(document).on("click", ".giffy", function () {

        if (this.getAttribute("id") === germany) {
            country = "german"
        }
        if (this.getAttribute("id") === mexico) {
            country = "mexican"
        }
        if (this.getAttribute("id") === america) {
            country = "american"
        }
        if (this.getAttribute("id") === japan) {
            country = "japanese"
        }
        if (this.getAttribute("id") === france) {
            country = "french"
        }
        if (this.getAttribute("id") === italy) {
            country = "italian"
        }

        defineVariables();

    })
//onclick listener to listen for answers to the quiz questions (except giffy question)
    $(document).on("click", ".buttonAnswers", checkButtonClick);
    $("#next-question").on("click", function () {
        if (i < 6) {
            defineVariables();
        }
        if (i === 6) {
            checkButtonClick();
        }
    })
// check that the previously defined parameters were actually defined; if not, pass an empty value for the xyzURL variable so it will gets left off the API call
    function quiz() {
        if (ingredients === null) {
            ingredientURL = ""
        }
        if (diet === null) {
            dietURL = ""
        }
        if (timeToCook === null) {
            timeToCookURL = ""
        }
        if (caloric === null) {
            caloricURL = ""
        }
        if (restrictions === null) {
            restrictionsURL = ""
        }
        var newCountry = country
// define API call URL with the parameters, and perform AJAX call with then promise to write the title and ingredients
        var queryURL = "https://api.edamam.com/search?q=" + newCountry + "&app_id=cc37353f&app_key=36c506cb4523a2b0efb3a66e52109bdd&from=0&to=5" + ingredientURL + dietURL + timeToCookURL + caloricURL + restrictionsURL;

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
        }).then(function (response) {
            var results = response.hits
            var label = results[1].recipe.label
            $("#question").html("<a href='" + results[1].recipe.url + "'target = '_blank'>" + label + "</a>")

            for (j = 0; j < results[1].recipe.ingredientLines.length; j++) {
                var ingredientLines = results[1].recipe.ingredientLines[j]
                $("#buttons-view").append("<br>" + ingredientLines + "<br/>").css("color", "white")
            }

// if the API parameters are too narrow, the call will fail; in case of failure, print the following message and a link to redirect to the home page so person can retake quiz
        }).fail(function (response) {
            $("#question").html("Oh No, we have no selections based on your input? <a href='http://uphilgood.github.io/INeedArrays-Proj1/#modal1'>Try Again?</a>")
        })

    }

// gif API call for question 1. use giftastic images to generate "q" parameter for edamam API call
    function gifs() {
        var cuisines = ["Mexico", "Germany", "Japan", "USA", "France","Italy"]

        for (m = 0; m < cuisines.length; m++) {
            var cuisine = cuisines[m]

            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lDk3q639ddTqVr5NUUFSZEx1u8BpTfwc&q=" + cuisine + "&limit=1&offset=0&rating=G&lang=en";

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(response => {
                var results = response.data[0]
                id = results.id
                if (results.slug.includes("mexico") || results.title.includes("mexico")) {
                    mexico = results.id
                }
                if (results.slug.includes("germany") || results.title.includes("germany")) {
                    germany = results.id
                }
                if (results.slug.includes("japan") || results.title.includes("japan")) {
                    japan = results.id
                }
                if (results.slug.includes("usa") || results.title.includes("usa")) {
                    america = results.id
                }
                if (results.slug.includes("france") || results.title.includes("france")) {
                    france = results.id
                }
                if (results.slug.includes("italy") || results.title.includes("italy")) {
                    italy = results.id
                }

                var buttonPlace = $("#buttons-view")
                buttonPlace.append("<img src='" + results.images.fixed_height.url + "' width='175' class='giffy' id='" + results.id + "'value='" + cuisine + "'/><br>")

            })


        }
    }
})