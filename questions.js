$(document).ready(function () {

    var i = 0;
    var diet = null;
    var ingredients = null;

    var restrictions = null;
    var caloric = null;
    var timeToCook = null;
    var searchTerm = null;

    var germany = "3ohfFhUGrwrJ7bJP4k"
    var mexico = "l0EryCPT7NMcc93Py"
    var america = "3osxYcwi3hCVbzNYqY"
    var japan = "OIOQN83mP9Bew"
    var france = "3oEdv7PCSvCW183t3a"
    var country = ''

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
            $("#question").html("<h4>" + newQuestions[i].q + "</h4>")
            var button = $("<button>")
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
            } else {
                gifs();

            }



        }
        i++;
    }
    defineVariables();

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

        defineVariables();

    })

    $(document).on("click", ".buttonAnswers", checkButtonClick);
    $("#next-question").on("click", function () {
        if (i < 6) {
            defineVariables();
        }
        if (i === 6) {
            checkButtonClick();
        }
    })

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

        var queryURL = "https://api.edamam.com/search?q=" + newCountry + "&app_id=cc37353f&app_key=36c506cb4523a2b0efb3a66e52109bdd&from=0&to=5" + ingredientURL + dietURL + timeToCookURL + caloricURL + restrictionsURL;
        console.log(queryURL)
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


        }).fail(function (response) {
            $("#question").html("Oh No, we have no selections based on your input? <a href='http://uphilgood.github.io/INeedArrays-Proj1/#modal1'>Try Again?</a>")
        })

    }


    function gifs() {
        var cuisines = ["Mexico", "Germany", "Japan", "USA", "France"]

        for (m = 0; m < cuisines.length; m++) {
            var cuisine = cuisines[m]
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lDk3q639ddTqVr5NUUFSZEx1u8BpTfwc&q=" + cuisine + "&limit=1&offset=0&rating=G&lang=en";
            
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(response => {
                var results = response.data[0]
                console.log(results)

                var buttonPlace = $("#buttons-view")
                buttonPlace.append("<img src='" + results.images.fixed_height.url + "' width='175' class='giffy' id='" + results.id + "'value='" + cuisine + "'/><br>")

            })

        }
    }
})