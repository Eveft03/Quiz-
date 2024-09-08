const udername = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores= JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;
console.log(highScores);


finalScore.innerText = mostRecentScore; 

username.addEventListener('keyup', () =>{
    console.log(username.value); //show usernames in console
    saveScoreBtn.disabled =!username.value; //enable save button when username is entered
});

saveHighScore = e => {
    console.log("save button clicked uwu");
    e.preventDefault(); // preventing the form from submitting to new page

    const score= {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score); //sort highscores

    highScores.splice(MAX_HIGH_SCORES); //remove the lowest score if there are more than
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/'); // redirect to the highscores page
    console.log(highScores);
};