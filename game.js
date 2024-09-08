const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=30&type=multiple"
).then(res => {
  return res.json();
}).then(loadedQuestions => {
  console.log(loadedQuestions.results);
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    };
    
    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1; //pick a random number between 1 and 3
    answerChoices.splice(
      formattedQuestion.answer - 1,
      0, 
      loadedQuestion.correct_answer
    ); //insert the correct answer at the correct position
    
    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });

    return formattedQuestion;
  });

  startGame();
}).catch(err => {
  console.error(err);
});

//CONSTANTS

const CORRECT_ANSWER_POINTS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //Take this array spread the items into this array
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){
    //save score to local storage
    localStorage.setItem("mostRecentScore", score);
//go to the end page
 return window.location.assign("end.html"); // redirect to the end page
  }
   questionCounter++;
questionCounterText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`; //update the


   const questionIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;

   choices.forEach((choice) => {
    const number = choice.dataset["number"]; //reference to the number from data-naumber
    const choiceText = currentQuestion["choice" + number];

     if(choiceText) {
       choice.parentElement.style.display = "flex"; //show the choice
       choice.innerText = choiceText;
     } else {
      choice.parentElement.style.display = "none"; //hide the choice
     }
   });
   availableQuestions.splice(questionIndex, 1); //remove the question from the array so it can't be asked again

   acceptingAnswers = true; //allowing answers from the user
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

     //Check if correct or incorrect
    const classToApply = 
    selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; //applying correct or incorrect class to the choice

    if (classToApply === 'correct') {
      incrementScore(CORRECT_ANSWER_POINTS); //incrementing the score if correctmentScore(CORRECT_POINTS); //incrementing the score if correct
    }
   
    selectedChoice.parentElement.classList.add(classToApply); //applying class to the choice
    

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply); //removing class after a second
      getNewQuestion();
    }, 1000);

});
});

incrementScore = num => {
  score +=num; //incrementing the score
  scoreText.innerText = score; //updating the score text
}

