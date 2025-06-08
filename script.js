const photoData = [
  {
    file: 'images/cat.jpg',
    answers: ['cat', 'kitten'],
    hint: 'It says "meow".'
  },
  {
    file: 'images/dog.jpg',
    answers: ['dog', 'puppy'],
    hint: 'It loves to bark.'
  },
  {
    file: 'images/تفاحة.jpg',
    answers: ['تفاحة', 'apple'],
    hint: 'فاكهة لونها غالباً أحمر أو أخضر.'
  },
  {
    file: 'images/كرة.jpg',
    answers: ['كرة', 'ball'],
    hint: 'تستخدم في لعب كرة القدم.'
  }
];

let currentPhotoIndex = 0;
let guessedCorrectly = false;
let teams = [];
let currentTeamIndex = 0;

// DOM Elements
const teamSelectionScreen = document.getElementById('team-selection-screen');
const teamNamesContainer = document.getElementById('team-names-container');
const teamNameInputsDiv = document.getElementById('teamNameInputs');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('game-container');
const photo = document.getElementById('photo');
const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const pointButtons = document.getElementById('point-buttons');
const hintArea = document.getElementById('hintArea');

// Setup team inputs
document.getElementById('nextToNameInputBtn').addEventListener('click', () => {
  const teamCount = parseInt(document.getElementById('teamCountSelect').value);
  teamNameInputsDiv.innerHTML = '';
  for (let i = 0; i < teamCount; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Team ${i + 1} Name`;
    input.id = `teamInput${i}`;
    teamNameInputsDiv.appendChild(input);
  }
  teamSelectionScreen.style.display = 'none';
  teamNamesContainer.style.display = 'block';
});

// Start game
document.getElementById('startGameBtn').addEventListener('click', () => {
  const inputs = teamNameInputsDiv.querySelectorAll('input');
  teams = Array.from(inputs).map((input, index) => ({
    name: input.value.trim() || `Team ${index + 1}`,
    score: 0
  }));

  updateScoreboard();
  teamNamesContainer.style.display = 'none';
  scoreboard.style.display = 'flex';
  gameContainer.style.display = 'block';
  loadPhoto();
});

function updateScoreboard() {
  scoreboard.innerHTML = '';
  teams.forEach((team, index) => {
    const div = document.createElement('div');
    div.className = 'score';
    div.id = `teamScore${index}`;
    div.innerHTML = `${team.score}<br><small>${team.name}</small>`;
    scoreboard.appendChild(div);
  });
}

function loadPhoto() {
  const photoObj = photoData[currentPhotoIndex];
  photo.src = photoObj.file;
  guessInput.value = '';
  hintArea.textContent = '';
  message.textContent = '';
  guessedCorrectly = false;

  guessInput.style.display = 'inline-block';
  document.getElementById('submitGuessBtn').style.display = 'inline-block';
  document.getElementById('hintBtn').style.display = 'inline-block';
  document.getElementById('nextPhotoBtn').style.display = 'none';
  pointButtons.innerHTML = '';

  // Show "No one knows it" button immediately
  const noPointBtn = document.createElement('button');
  noPointBtn.textContent = 'No one knows it';
  noPointBtn.id = 'noPointBtn';
  noPointBtn.onclick = () => {
    message.textContent = 'No points awarded.';
    document.getElementById('nextPhotoBtn').style.display = 'inline-block';
    pointButtons.innerHTML = '';
  };
  pointButtons.appendChild(noPointBtn);
}

// Handle guess
document.getElementById('submitGuessBtn').addEventListener('click', () => {
  if (guessedCorrectly) return;
  const userGuess = guessInput.value.trim().toLowerCase();
  const correctAnswers = photoData[currentPhotoIndex].answers;

  if (correctAnswers.includes(userGuess)) {
    guessedCorrectly = true;
    guessInput.style.display = 'none';
    document.getElementById('submitGuessBtn').style.display = 'none';
    document.getElementById('hintBtn').style.display = 'none';
    message.textContent = 'Correct! Choose which team gets the point.';

    pointButtons.innerHTML = '';
    teams.forEach((team, index) => {
      const btn = document.createElement('button');
      btn.textContent = team.name;
      btn.onclick = () => {
        teams[index].score++;
        updateScoreboard();
        message.textContent = `Point awarded to ${team.name}`;
        document.getElementById('nextPhotoBtn').style.display = 'inline-block';
        pointButtons.innerHTML = '';
      };
      pointButtons.appendChild(btn);
    });

    // Keep "No one knows it" button
    const noPointBtn = document.createElement('button');
    noPointBtn.textContent = 'No one knows it';
    noPointBtn.id = 'noPointBtn';
    noPointBtn.onclick = () => {
      message.textContent = 'No points awarded.';
      document.getElementById('nextPhotoBtn').style.display = 'inline-block';
      pointButtons.innerHTML = '';
    };
    pointButtons.appendChild(noPointBtn);
  } else {
    message.textContent = 'Wrong guess. Try again!';
  }
});

// Hint
document.getElementById('hintBtn').addEventListener('click', () => {
  const hint = photoData[currentPhotoIndex].hint;
  hintArea.textContent = hint || 'No hint available.';
});

// Next photo
document.getElementById('nextPhotoBtn').addEventListener('click', () => {
  currentPhotoIndex++;
  if (currentPhotoIndex >= photoData.length) {
    message.textContent = 'Game over!';
    photo.style.display = 'none';
    guessInput.style.display = 'none';
    document.getElementById('submitGuessBtn').style.display = 'none';
    document.getElementById('hintBtn').style.display = 'none';
    pointButtons.innerHTML = '';
    document.getElementById('nextPhotoBtn').style.display = 'none';
  } else {
    loadPhoto();
  }
});
