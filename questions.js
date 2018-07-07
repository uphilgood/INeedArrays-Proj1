var i = 0;
var diet = '';
    var ingredients = null;
    
    var restrictions = null;
    var caloric = null;
    var timeToCook = null;
    var searchTerm = null;

$(document).ready(function () {


    

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
                    }).text(newQuestions[i].answers[x]).addClass("waves-effect waves-light btn-small buttonAnswers")
                    $("#buttons-view").append(button);
                    
                    button = $("<button>")

                }
            } else {
                gifs();

            }



        }i++;
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
            } if ($(this).val() === '30-60') {
                timeToCook = "60"
            } if ($(this).val() === 'All the Time in the World') {
                timeToCook = ""

            } timeToCookURL = "&time=" + timeToCook;
    }
        if ($(this).attr("parameter") == "caloric") {
            if ($(this).val() === '0-1000') {
                caloric = "1000"
            } if ($(this).val() === '1000-1500') {
                caloric = "1000-1500"
            } if ($(this).val() === 'YOLO') {
                caloric = "0+"
            } 
            caloricURL = "&calories=" + caloric
        }
        if ($(this).attr("parameter") == "restrictions") {
            restrictions = $(this).val();
            restrictionsURL = "&healthlabels=" + restrictions;
        }


        if (i === 6) {

            // var button = $("<button>")
            // button.attr({
            //     type: "button",
            //     id: "resultsButton"
            // }).text("See your Results!").addClass("waves-effect waves-light btn-large resultsButton")
            $("#question").html("");
            $("#buttons-view").html("");
            // $("#question").append(button)
            quiz();
            $("#resultsButton").on("click", function () {

                window.open("https://www.google.com")
                $('.modal').modal().close()
                
            })

        }
        
        defineVariables();
        


    }

    $(document).on("click", ".giffy", function () {
        
        window.searchTerm = $(this);
        
        defineVariables();

    })

    $(document).on("click", ".buttonAnswers", checkButtonClick);
    $("#next-question").on("click",function () {
        defineVariables();
    })

})



function quiz() {
    if (ingredients === null) {
        ingredientURL = ""
    } if (diet === null) {
        dietURL = ""
    } if (timeToCook === null) {
        timeToCookURL = ""
    } if (caloric === null) {
        caloricURL = ""
    } if (restrictions === null) {
        restrictionsURL = ""
    }
    
    // var queryURL = "https://api.edamam.com/search?q=pork&app_id=cc37353f&app_key=36c506cb4523a2b0efb3a66e52109bdd&from=0&to=2"
    var queryURL = "https://api.edamam.com/search?q=cake&app_id=cc37353f&app_key=36c506cb4523a2b0efb3a66e52109bdd&from=0&to=5" + ingredientURL + dietURL + timeToCookURL + caloricURL + restrictionsURL;
    
    console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var results = response.hits
            randomNum = Math.floor(Math.random() * 5)
            var label = results[1].recipe.label
            $("#question").html("<a href='"+results[1].recipe.url+"'>"+label+"</a>")
            
            for (j=0;j<results[1].recipe.ingredientLines.length;j++){
            var ingredientLines = results[1].recipe.ingredientLines[j]
            console.log(ingredientLines)
            $("#buttons-view").append("<br>" + ingredientLines + "<br/>")
            }
            
                
            }).fail(function (response){
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

            var buttonPlace = $("#buttons-view")
            buttonPlace.append("<img src='" + results.images.fixed_height.url + "' width='175' class='giffy' value='" + results.slug + "'/><br>")
        })

    }




}