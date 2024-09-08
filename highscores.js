const highScoresList = document.getElementById('highScoresList');
let highScores = JSON.parse(localStorage.getItem('highScores'));

// Έλεγχος αν το highScores είναι πίνακας
if (!Array.isArray(highScores)) {
  highScores = []; // Αν δεν είναι, αρχικοποιείται ως κενός πίνακας
}

highScoresList.innerHTML = highScores.map(score => {
  return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');