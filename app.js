$(document).ready(function () {

var user = {}
var apiKey = '28a6f1595230053fe6ef116fa7e95a20'
var appId = 'f0fdc783'
var search = 'burgers'
var gif = ''
var userId = 0
var questions = [{
        q: "What country you would like to taste?",
        data: ''
    },
    {
        q: "Do you want chicken?",
        data: "chicken"
    },
    {
        q: "Do you want seafood?",
        data: "seafood"
    },
    {
        q: "Do you want beef?",
        data: "beef"
    },
    {
        q: "Do you want pork?",
        data: "pork"
    },
    {
        q: "Do you want pork?",
        data: "pork"
    },
    {
        q: "How many people are eating?",
        data: ""
    },
    {
        q: "How old are you?",
        data: ""
    }
]

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
}

$("#usersubmit").on("click", function(event){
    event.preventDefault();
submitUser()
})

function random() {
    var userQuestions = questions[Math.floor(Math.random() * questions.length)];
    var questionDiv = $("<div>")
    $("#question-appear-here").append(questionDiv.html(userQuestions.q))


    if (userQuestions.q.includes("Do you want")) {

        var buttonYes = $("<button>")
        buttonYes.addClass("btn btn-primary").attr("value", "yes").text("Yes")
        $("#question-appear-here").append(buttonYes)
        var buttonNo = $("<button>")
        buttonNo.addClass("btn btn-primary").attr("value", "no").text("No")
        $("#question-appear-here").append(buttonNo)
    } else {
        var form = $("<form>")
        var input = $("<input>")
        input.attr({
            type: "text",
            data: userQuestions.data
        })
        form.append(input)
        $("#question-appear-here").append(form)
        $("#question-appear-here").append('<button class="btn btn-primary" id="submit-button">Submit')
    }
}

random()

function recipe() {
    var queryURL =
        "https://api.edamam.com/search?q=burgers&app_id=f0fdc783&app_key=28a6f1595230053fe6ef116fa7e95a20&from=0&to=10"
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
    }).then(response => {
        console.log(response.hits[0].recipe)
        response.hits.map((a) => {
            var imageDiv = $("<div>")
            var p = $("<p>").css('text-align', 'center').css('color', 'azure');
            var gifImage = $("<img>")
            gifImage.attr("src", a.recipe.image)
            imageDiv.append(gifImage).append(p)
            $("#gifs-appear-here").prepend(imageDiv)
            // $("#ing-appear-here").html(a.recipe.ingredientLines)
        })
    });
}

function getGiphy(gif) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ANL1wBop73GYuyhDonxP9gis4JaIoV58&q=" + gif +
        "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
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



function searchFood() {
    var searchTerm = $("#searchTerms").val().trim();
    var queryURL =
        "https://api.edamam.com/search?q="+ searchTerm +"&app_id=f0fdc783&app_key=28a6f1595230053fe6ef116fa7e95a20&from=0&to=10"
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",
    }).then(response => {
        console.log(response.hits[0].recipe.label)
})}

$("#searchSubmit").on("click",function() {
    event.preventDefault();
    searchFood();

})

function randomFood() {
    var randomFoodTerms = ["pork","chicken","milk","chocolate","beef","yogurt","cheese","apple","banana","fruits","rice","spinach","kale","eggs"]
    var termIndex = Math.floor(Math.random() * randomFoodTerms.length)
    // console.log(randomFoodTerms[termIndex])
    var oneResult = Math.floor(Math.random() * 30);
    var oneResult1 = oneResult + 1;
    var queryURL =
        "https://api.edamam.com/search?q="+ randomFoodTerms[termIndex] +"&app_id=f0fdc783&app_key=28a6f1595230053fe6ef116fa7e95a20&from=" + oneResult + "&to=" + oneResult1;
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",
    }).then(response => {
        console.log(response.hits[0].recipe.label)

})}

randomFood();

$("#randomSubmit").on("click", function() {
    randomFood();

})


$('.modal').modal();

});
