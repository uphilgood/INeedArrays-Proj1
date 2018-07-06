var i = 0;


$(document).ready(function () {


    var diet = '';
    var ingredients = '';
    var restrictions = '';
    var caloric = '';
    var timeToCook = '';
    var searchTerm = '';

    function defineVariables() {
        if (i < 6) {
            $("#question").html("")
            $(".buttonAnswers").remove();
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
                    }).text(newQuestions[i].answers[x]).addClass("waves-effect waves-light btn-small buttonAnswers")
                    $("#buttons-view").append(button);
                    
                    button = $("<button>")

                }
            } else {
                gifs();

            }



        }
    }
    defineVariables();

    function checkButtonClick() {

        if ($(this).attr("parameter") == "diet") {
            window.diet = $(this).val();

        }
        if ($(this).attr("parameter") == "ingredients") {
            window.ingredients = $(this).val();

        }
        if ($(this).attr("parameter") == "timeToCook") {
            if ($(this).val() === '0-30') {
                window.timeToCook = "30"
            } if ($(this).val() === '30-60') {
                window.timeToCook = "60"
            } if ($(this).val() === 'All the Time in the World') {
                window.timeToCook = ""

        }}
        if ($(this).attr("parameter") == "caloric") {
            if ($(this).val() === '0-1000') {
                window.caloric = "1000"
            } if ($(this).val() === '1000-1500') {
                window.caloric = "1000-1500"
            } if ($(this).val() === 'YOLO') {
                window.caloric = "0+"
            } 

        }
        if ($(this).attr("parameter") == "restrictions") {
            window.restrictions = $(this).val();
        }


        if (i === 6) {

            var button = $("<button>")
            button.attr({
                type: "button",
                id: "resultsButton"
            }).text("See your Results!").addClass("waves-effect waves-light btn-large resultsButton")
            $("#question").html("");
            $("#buttons-view").html("");
            $("#question").append(button)
            quiz();
            $("#resultsButton").on("click", function () {

                window.open("https://www.google.com")
                $('.modal').modal().close()
                
            })

        }
        
        defineVariables();
        i++;


    }

    $(document).on("click", ".giffy", function () {
        
        window.searchTerm = $(this);
        i++;
        defineVariables();

    })

    $(document).on("click", ".buttonAnswers", checkButtonClick);


})



function quiz() {

    
    var queryURL = "https://api.edamam.com/search?q=pork&app_id=cc37353f&app_key=36c506cb4523a2b0efb3a66e52109bdd&from=0&to=2"
    // var queryURL = "https://api.edamam.com/search?q=pork&app_id=cc37353f&app_key=36c506cb4523a2b0efb3a66e52109bdd&from=0&to=5&ingr=" + ingredients + "&diet=" + diet + "&time=" + timeToCook + "&calories=" + caloric + "&healthlabels=" + restrictions;
    console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var results = response.hits
            randomNum = Math.floor(Math.random() * 5)
            var label = results[1].recipe.label
            $("#question").html(label)
            for (j=0;j<results[0].recipe.ingredientLines.length;j++){
            var ingredientLines = results[0].recipe.ingredientLines[j]
            console.log(ingredientLines)
            $("#button-view").append(ingredients)
            }
            
                
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

            var buttonPlace = $("#buttons-view")
            buttonPlace.append("<img src='" + results.images.fixed_height.url + "' width='175' class='giffy buttonAnswers' value='" + results.slug + "'/><br>")
        })

    }




}