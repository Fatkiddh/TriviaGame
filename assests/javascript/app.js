// checking if page is linked correctly
// alert("hello world");

$("#start").on("click", function(){
  $("#start").remove();
  game.loadQuestion();
});

$(document).on("click",".answer-button",function(e){
  game.clicked(e);
})

$(document).on("click", "#reset",function(){
  game.reset();
})

// object for questions
var questions = [
  {
    question: "Who won fifa 2017 ballon de or?",
    choices: ["Ronaldo", "Messi","neymar", "Pele"],
    correctAnswer: "Ronaldo",
  },
  {
    question: "What Team has the Most Champions titles",
    choices: ["Barcelona", "Liverpool", "Real Madrid", "Bayern Munich"],
    correctAnswer: "Real Madrid",
  },
  {
    question: "this country has the most World Cup Championships?",
    choices: ["Brazil", "USA","Mexico", "Argentina"],
    correctAnswer: "Brazil",
  },
  {
    question: "Who is the World cup leading Scorer?",
    choices: ["Ronaldo", "Messi","Pele", "Klose"],
    correctAnswer: "Klose",
  },
  {
    question:"who is the oldest player to Score in a world cup?",
    choices: ["Klose", "Pele", "Milla", "Donovan"],
    correctAnswer:"Milla",
  }];


  var game = {
    questions:questions,
    currentQuestions:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,

    //function to countdown from 30 to 0, if its 0 add 1 to currentAnswered and show correctAnswer
    countdown: function(){
      game.counter--;
      $("#counter").html(game.counter);
      if (game.counter<=0) {
        console.log("TIME UP!");
        game.timeUp();
      }
    },

    loadQuestion: function(){
      timer = setInterval(game.countdown,1000);
      $("#subwrapper").html("<h2>Time Remaining <span id= 'counter'>30</span> Seconds</h2>")
      $("#subwrapper").append("<h2>"+questions[game.currentQuestions].question+"</h2>");
      for(var i=0; i<questions[game.currentQuestions].choices.length;i++){
        $("#subwrapper").append('<button class="answer-button" id="button-'+i+ '" data-name="'+questions[game.currentQuestions].choices[i]+'">'+questions[game.currentQuestions].choices[i]+'</button>');
      }
    },

    //reseting counter to 40 and loading next qestion
    nextQuestion: function(){
      game.counter= 30;
      $("#counter").html(game.counter);
      game.currentQuestions++;
      game.loadQuestion();
    },

    //if time runs out with out a choice declares out of time, shows the correct answer, and adds 1 to the unanswered scored.
    timeUp:function(){
      clearInterval(timer);
      game.unanswered++;
      $("#subwrapper").html("<h2>Out of Time</h2>");
      $("#subwrapper").append("<h3>The Correct Answer was: "+questions[game.currentQuestions].correctAnswer+"</h3>");
      if(game.currentQuestions==questions.length-1){
        setTimeout(game.results,3*1000);
      } else {
        setTimeout(game.nextQuestion,3*1000);
      }
    },

    //end of the quiz shows number right, wrong, and unanswered, puts a Reset button on page to start over.
    results: function(){
      clearInterval(timer);
      $("#subwrapper").html("<h3> "+ "all Done" + "</h3>");
      $("#subwrapper").append("<h3>correct: "+ game.correct+ "</h3>");
      $("#subwrapper").append("<h3>incorrect: "+ game.incorrect+ "</h3>");
      $("#subwrapper").append("<h3>unanswered: "+ game.unanswered+ "</h3>");
      $("#subwrapper").append("<button id='reset'>RESET</button>");
    },

    //checking if the anwser clicked is the correct answer for the current question, if it is +1 for correct, if not score +1 for incorrect
    clicked: function(e){
      clearInterval(timer);
      if($(e.target).data("name")==questions[game.currentQuestions].correctAnswer){
        game.answeredCorrectly();
      } else {
        game.answeredIncorrectly();
      }

    },

    //answeredCorrectly function; reseting timer to 30 seconds, adding one to correct answer, checking if last question
    answeredCorrectly: function(){
      console.log("you got it");
      clearInterval(timer);
      game.correct++;
      $("#subwrapper").html("<h2>You got it right!</h2>");
      if(game.currentQuestions==questions.length-1){
        setTimeout(game.results,3*1000);
      } else {
        setTimeout(game.nextQuestion,3*1000);
      }
    },

    //answeredIncorrectly function; reseting timer, adding one to incorrect score
    answeredIncorrectly: function(){
      console.log("wrong");
      clearInterval(timer);
      game.incorrect++;
      $("#subwrapper").html("<h2>You got it wrong!</h2>");
      $("#subwrapper").append("<h3>The Correct Answer was: "+questions[game.currentQuestions].correctAnswer+"</h3>");
      if(game.currentQuestions==questions.length-1){
        setTimeout(game.results,3*1000);
      } else {
        setTimeout(game.nextQuestion,3*1000);
      }
    },

    //reset function setting everything back to 0 and loading new game.
    reset: function(){
      game.currentQuestions = 0;
      game.counter = 0;
      game.correct = 0;
      game.incorrect =0;
      game.unanswered =0;
      game.loadQuestion();

    }

  }
