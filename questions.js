$(document).ready(function () {
    var newArray = [];
    var trivia = {
        questions: [{
                q: "Who won the 2017 NFL SuperBowl?",
                selected: false,
                options: [{
                        choice: "redskins",
                        answer: ''
                    },
                    {
                        choice: "49ers",
                        answer: ''
                    },
                    {
                        choice: "Patriots",
                        answer: ''
                    },
                    {
                        choice: "Eagles",
                        answer: "Eagles"
                    }
                ]
            },

            {
                q: "What country hosted this year's Winter Olympics?",
                selected: false,
                options: [{
                        choice: "Germany",
                        answer: ''
                    },
                    {
                        choice: "Korea",
                        answer: "Korea"
                    },
                    {
                        choice: "Russia",
                        answer: ''
                    },
                    {
                        choice: "USA",
                        answer: ''
                    }
                ]
            },

            {
                q: "What team won the 2018 Stanley Cup?",
                selected: false,
                options: [{
                        choice: "Washington Capitals",
                        answer: "Washington Capitals"
                    },
                    {
                        choice: "Pittsburg Pengiuns",
                        answer: ''
                    },
                    {
                        choice: "Las Vegas Golden Knights",
                        answer: ''
                    },
                    {
                        choice: "San Jose Sharks",
                        answer: ''
                    }
                ]
            },

            {
                q: "What team did former Washington Redskins quarterback, Kirk Cousins, go to?",
                selected: false,
                options: [{
                        choice: "Detroit Lions",
                        answer: ''
                    },
                    {
                        choice: "LA Rams",
                        answer: ''
                    },
                    {
                        choice: "Minnesota Vikings",
                        answer: "Minnesota Vikings"
                    },
                    {
                        choice: "New York Giants",
                        answer: ''
                    }
                ]

            },

            {
                q: "What country is hosting this year's Fifa World Cup?",
                selected: false,
                options: [{
                        choice: "Germany",
                        answer: ''
                    },
                    {
                        choice: "Korea",
                        answer: ''
                    },
                    {
                        choice: "Russia",
                        answer: "Russia"
                    },
                    {
                        choice: "USA",
                        answer: ''
                    }
                ]
            },
            {
                q: "What team did Micheal Jordan play with after the Bulls?",
                selected: false,
                options: [{
                        choice: "DetroitPistons",
                        answer: ''
                    },
                    {
                        choice: "New Jersey Nets",
                        answer: ''
                    },
                    {
                        choice: "Washington Wizards",
                        answer: "Washington Wizards"
                    },
                    {
                        choice: "Boston Celtics",
                        answer: ''
                    }
                ]
            },
            {
                q: "Who was the highest paid athletic in 2017?",
                selected: false,
                options: [{
                        choice: "Floyd Mayweather",
                        answer: "Floyd Mayweather"
                    },
                    {
                        choice: "Conor McGregor",
                        answer: ''
                    },
                    {
                        choice: "Cristano Ronaldo",
                        answer: ""
                    },
                    {
                        choice: "Steph Curry",
                        answer: ''
                    }
                ]
            },
            {
                q: "Who won the NBA Finals MVP in 2018?",
                selected: false,
                options: [{
                        choice: "Steph Curry",
                        answer: ""
                    },
                    {
                        choice: "Kevin Durant",
                        answer: "Kevin Durant"
                    },
                    {
                        choice: "LeBron James",
                        answer: ""
                    },
                    {
                        choice: "Michael Jordan",
                        answer: ''
                    }
                ]
            },
            {
                q: "Which many Super Bowls did the Pittsburgh Steelers win?",
                selected: false,
                options: [{
                        choice: "5",
                        answer: ""
                    },
                    {
                        choice: "6",
                        answer: "6"
                    },
                    {
                        choice: "2",
                        answer: ""
                    },
                    {
                        choice: "3",
                        answer: ''
                    }
                ]
            },
            {
                q: "How many players are playing on soccer field per team?",
                selected: false,
                options: [{
                        choice: "11",
                        answer: "11"
                    },
                    {
                        choice: "6",
                        answer: ""
                    },
                    {
                        choice: "10",
                        answer: ""
                    },
                    {
                        choice: "13",
                        answer: ''
                    }
                ]
            }

        ],
        random: function () {
            if (newArray.length === this.questions.length) {
                alert("GAME OVER")
                $('#start').show()
            }
            $('#buttons-view').empty()
            $('#right').hide()
            $('#start').hide()
            thisQuestionAnswer = ''
            randomQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
            indOfQuestion = this.questions.indexOf(randomQuestion)

            this.questions[indOfQuestion].options.forEach(choice => {

                var a = $("<button>")
                a.addClass("btn btn-primary").attr

                ({
                    dataname: choice.answer,
                    id: choice.choice
                }).text(choice.choice)

                $('#buttons-view').append(a)
                console.log(choice)
            })

            console.log(randomQuestion)
            $('#question').html("<h2>" + this.questions[indOfQuestion].q + "</h2>")

            // this.questions[indOfQuestion].selected = true;
            newArray = this.questions.splice(indOfQuestion, 1)


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

    

    $(document).on("click", ".btn", trivia.checkCorrect);

    trivia.random();

    $('#start').click(function () {
        trivia.random()
    })

    $('#next-question').click(function () {
        trivia.random()
    })

    $('#next-question2').click(function () {
        trivia.random()
    })

})