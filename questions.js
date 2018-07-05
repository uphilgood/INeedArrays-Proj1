$(document).ready(function () {
    var newArray = [];
    var questionsAsked = 0;



    var trivia = {
        newQuestions: [{
            q: "How hungry are you?",
            option: ["chicken","horse"],
            data: ""
        },
        {
            q: "How would you characterize yourself?",
            option: ["omnivore","carnivore","herbivore"],
            data: ""
    
        }, {
            q: "How many people will be eating?",
            data: ""
        }, {
            q: "Food restrictions and/or allergies?",
            data: ""
        }, {
            q: "Celebrating an occasion?",
            option: ["birthday","anniversary","other"],
            data: ""
        }, {
            q: "Breakfast, Lunch, or Dinner?",
            option: ["Breakfast","Lunch","Dinner","Snack","other"],
            data: ""
        }, {
            q: "What country do you want to eat?",
            data: ""
    
        }, {
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
            q: "How much flavor do you want?",
            data: ""
        },
        {
            q: "How many people are eating?",
            data: ""
        },
        {
            q: "How old are you?",
            data: ""
        },
        {
            q: "Pick a gif that reflects your mood.",
            data: ""
        }, {
            q: "Are you hungover?",
            data: ""
        },
    ],
        askQuestion: function () {
            if (questionsAsked === 5) {
                //close modal

            }
            $("#next-question").show()
            $('#buttons-view').empty()
            randomQuestion = this.newQuestions[Math.floor(Math.random() * this.newQuestions.length)];
            indOfQuestion = this.newQuestions.indexOf(randomQuestion)

            if (this.newQuestions[indOfQuestion].option) {
            this.newQuestions[indOfQuestion].option.forEach(choice => {

                var a = $("<button>")
                a.addClass("waves-effect waves-light btn-small").attr

                ({
                    dataname: choice,
                    id: choice
                }).text(choice)

                $('#buttons-view').append(a)

            })
        }

            console.log(randomQuestion)
            $('#question').html("<h2>" + this.newQuestions[indOfQuestion].q + "</h2>")
            

            // this.questions[indOfQuestion].selected = true;
            newArray = this.newQuestions.splice(indOfQuestion, 1)

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

})