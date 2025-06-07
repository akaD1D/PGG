const photoFiles = [
  'images/cat.jpg',
  'images/dog.jpg',
  'images/تفاحة.jpg',
  'images/كرة.jpg'
];

// Hints for each image filename (without extension)
const hintMap = {
  'cat': 'حيوان"',
  'dog': 'حيوان',
  'تفاحة': 'فاكهة',
  'كرة': 'لعبة'
};

let teamAName = '';
let teamBName = '';
let teamAScore = 0;
let teamBScore = 0;

let currentPhotoIndex = 0;
let currentTeam = 'A';
let guessedCorrectly = false;

function getAnswerFromFilePath(filePath) {
  const filename = filePath.split('/').pop();
  return filename.split('.')[0].toLowerCase();
}

function loadPhoto() {
  if (currentPhotoIndex >= photoFiles.length) {
    document.getElementById('message').textContent = 'Game over! Thanks for playing.';
    document.getElementById('photo').style.display = 'none';
    document.getElementById('guessInput').style.display = 'none';
    document.getElementById('submitGuessBtn').style.display = 'none';
    document.getElementById('hintBtn').style.display = 'none';
    document.getElementById('noPointBtn').style.display = 'none';
    document.getElementById('nextPhotoBtn').style.display = 'none';
    document.getElementById('current-team').textContent = '';
    return;
  }

  document.getElementById('photo').src = photoFiles[currentPhotoIndex];
  document.getElementById('photo').style.display = 'block';
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').style.display = 'inline-block';
  document.getElementById('submitGuessBtn').style.display = 'inline-block';
  document.getElementById('hintBtn').style.display = 'inline-block';
  document.getElementById('noPointBtn').style.display = 'inline-block';

  document.getElementById('current-team').textContent = `Current turn: ${currentTeam === 'A' ? teamAName : teamBName}`;
  document.getElementById('message').textContent = '';
}

function startGame() {
  teamAName = document.getElementById('teamAInput').value.trim() || 'Team A';
  teamBName = document.getElementById('teamBInput').value.trim() || 'Team B';

  document.getElementById('teamANameLabel').textContent = teamAName;
  document.getElementById('teamBNameLabel').textContent = teamBName;

  document.getElementById('scoreA').textContent = teamAScore;
  document.getElementById('scoreB').textContent = teamBScore;

  document.getElementById('givePointATeamBtn').textContent = `Give Point to ${teamAName}`;
  document.getElementById('givePointBTeamBtn').textContent = `Give Point to ${teamBName}`;

  document.getElementById('team-names-container').style.display = 'none';
  document.getElementById('scoreboard').style.display = 'flex';
  document.getElementById('game-container').style.display = 'block';

  loadPhoto();
}

function submitGuess() {
  if (guessedCorrectly) return;

  const guess = document.getElementById('guessInput').value.toLowerCase().trim();
  const correctAnswer = getAnswerFromFilePath(photoFiles[currentPhotoIndex]);

  if (guess === correctAnswer) {
    guessedCorrectly = true;
    document.getElementById('message').textContent = `Correct! Choose which team gets the point.`;

    document.getElementById('guessInput').style.display = 'none';
    document.getElementById('submitGuessBtn').style.display = 'none';
    document.getElementById('hintBtn').style.display = 'none';
    document.getElementById('noPointBtn').style.display = 'none';

    document.getElementById('givePointATeamBtn').style.display = 'inline-block';
    document.getElementById('givePointBTeamBtn').style.display = 'inline-block';
  } else {
    document.getElementById('message').textContent = 'Wrong guess. Try again!';
  }
}

function showHint() {
  const answer = getAnswerFromFilePath(photoFiles[currentPhotoIndex]);
  const hint = hintMap[answer];
  if (hint) {
    document.getElementById('message').textContent = `Hint: ${hint}`;
  } else {
    document.getElementById('message').textContent = `Hint: No hint available.`;
  }
}

function givePointToTeam(team) {
  if (team === 'A') {
    teamAScore++;
    document.getElementById('scoreA').textContent = teamAScore;
  } else {
    teamBScore++;
    document.getElementById('scoreB').textContent = teamBScore;
  }

  document.getElementById('givePointATeamBtn').style.display = 'none';
  document.getElementById('givePointBTeamBtn').style.display = 'none';
  document.getElementById('nextPhotoBtn').style.display = 'inline-block';

  const winner = team === 'A' ? teamAName : teamBName;
  document.getElementById('message').textContent = `Point given to ${winner}. Click Next Photo to continue.`;
}

function noPointGiven() {
  guessedCorrectly = true;
  document.getElementById('message').textContent = 'No points awarded. Click Next Photo to continue.';
  document.getElementById('guessInput').style.display = 'none';
  document.getElementById('submitGuessBtn').style.display = 'none';
  document.getElementById('hintBtn').style.display = 'none';
  document.getElementById('noPointBtn').style.display = 'none';
  document.getElementById('nextPhotoBtn').style.display = 'inline-block';
}

function nextPhoto() {
  if (!guessedCorrectly) {
    document.getElementById('message').textContent = 'Please guess correctly before moving on!';
    return;
  }

  currentPhotoIndex++;
  currentTeam = currentTeam === 'A' ? 'B' : 'A';
  guessedCorrectly = false;

  document.getElementById('nextPhotoBtn').style.display = 'none';

  loadPhoto();
}

// Event listeners
document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('submitGuessBtn').addEventListener('click', submitGuess);
document.getElementById('hintBtn').addEventListener('click', showHint);
document.getElementById('givePointATeamBtn').addEventListener('click', () => givePointToTeam('A'));
document.getElementById('givePointBTeamBtn').addEventListener('click', () => givePointToTeam('B'));
document.getElementById('noPointBtn').addEventListener('click', noPointGiven);
document.getElementById('nextPhotoBtn').addEventListener('click', nextPhoto);
