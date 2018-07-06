$(document).ready(function () {
    var newArray = [];
    var questionsAsked = 0;
   var question1Answer = ''



    var trivia = {
        newQuestions: [{
                q: "How many ingredients do you want to use?",
                option: ["0-5", "6-10", "11-15"],
                data: ""
            }, {


                q: "What best characterizes your current diet?",
                option: ["balanced", "high-protein", "high-fiber", "low-fat", "low-carb", "low-sodium"],
                data: ""
            },
            {
                q: "Do you have any of the following dietary restrictions?",
                option: ["peanut-free", "tree-nut-free", "soy-free", "fish-free", "shellfish-free"],
                data: ""

            }, {
                q: "What is your caloric max?",
                option: ["0-1000", "1000-1500","YOLO"],
                data: ""
            }, {
                q: "How much time do you have to make the meal?",
                option: ["0-30","30-60","All the Time in the World"],
                data: ""
            }, {
                q: "Is there anything you DO NOT want to eat?",
                option: [],
                data: ""
            }
        ],
        askQuestion: function () {
            if (questionsAsked === 5) {
                //close modal
                $('.modal').modal().close()

            }
            $("#next-question").show()
            $('#buttons-view').empty()
            randomQuestion = this.newQuestions[Math.floor(Math.random() * this.newQuestions.length)];
            indOfQuestion = this.newQuestions.indexOf(randomQuestion)

            if (this.newQuestions[indOfQuestion].option) {
                this.newQuestions[indOfQuestion].option.forEach(choice => {

                    var a = $("<button>")
                    a.addClass("waves-effect waves-light btn-small quizButton").attr

                    ({
                        dataname: choice,
                        id: choice
                    }).text(choice)
              
                    

                    $('#buttons-view').append(a)

                    if (indOfQuestion === 0) {
                        question1Answer = this.
                    }
                    
                    })
                }
                    // if (indOfQuestion === 0) {
                    //     ingredients = choice;
                    // } if (indOfQuestion === 0) {
                    //     window.diet = choice;
                    // } if (indOfQuestion === 0) {
                    //     window.allergies = choice;
                    // } if (indOfQuestion === 0) {
                    //     window.calories = choice;
                    // } if (indOfQuestion === 0) {
                    //     window.notWant = choice;
                    // } 

                

            console.log(randomQuestion)
            $('#question').html("<h2>" + this.newQuestions[indOfQuestion].q + "</h2>")


            // this.questions[indOfQuestion].selected = true;
            newArray = this.newQuestions.splice(indOfQuestion, 1)
            questionsAsked++

        },

        checkCorrect: function () {

            if (this.getAttribute("dataname") == this.getAttribute("id")) {
                console.log(this.getAttribute("id"))
                $('#right').show()
                $("#rightanswer").html("Great!  The correct answer was " + this.getAttribute("dataname"))
                stop()
            } else {
                alert("wrong, keep trying")
            }

        }
    };



    // $(document).on("click", ".btn", trivia.checkCorrect);

    trivia.askQuestion();

    $('#start').click(function () {
        trivia.random()
    })

    $('#next-question').click(function () {
        trivia.askQuestion()
    })

    $('#next-question2').click(function () {
        trivia.askQuestion()
    })



// function quiz() {
   
//     https://api.edamam.com/search?q=" + searchTerm + "&app_id=f0fdc783&app_key=28a6f1595230053fe6ef116fa7e95a20&from=0&to=10";

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         dataType: "jsonp",
//     }).then(response => {
//         var results = response.data
//         results.forEach(data => {
//             var imageDiv = $("<div>")
//             var p = $("<p>").text("rating; " + data.rating).css('text-align', 'center').css(
//                 'color', 'azure');
//             var gifImage = $("<img>")
//             gifImage.attr("src", data.images.fixed_height.url)
//                 .attr("data-still", data.images.fixed_height_still.url)
//                 .attr("data-animate", data.images.fixed_height.url)
//                 .attr("datastate", "still")
//                 .addClass("gif")
//                 .addClass("card-body")
//             imageDiv.append(gifImage).append(p)
//             $("#gifs-appear-here").prepend(imageDiv)
//         })
//     });
// }



function findID() {
    console.log(this.getAttribute("id"))

}

$(document).on("click", ".quizButton", findID )


})
