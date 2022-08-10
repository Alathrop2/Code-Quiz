var timeLeft = 60;
var currentQuestion = 0;
var startButton = document.querySelector('#startButton');
var initials = window.prompt('Enter initials for high score');
var leaderBoard = '';
// var questionbox = document.querySelector('#questionBox');
var answerBox = document.querySelector('#answerBox');
var question1 = document.querySelector('.questionText');
var answerButton1 = document.getElementById('answerButton1');
var answerButton2 = document.getElementById('answerButton2');
var answerButton3 = document.getElementById('answerButton3');
var HighScoreText = document.querySelector('#HighScore');
var answerContainer = document.getElementById('answerContainer');
var quizStarted = false;
var intervalId = null;
var runTimer = function () {
  intervalId = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft -= 1;
    }
    if (timeLeft === 0) {
      question1.textContent = 'YOU RAN OUT OF TIME!';
      answerButton1.classList.add('btn-danger');
      answerButton2.classList.add('btn-danger');
      answerButton3.classList.add('btn-danger');
      leaderBoard += initials + timeLeft;
      clearInterval(intervalId);
      localStorage.setItem('High Score', leaderBoard);
    }
    document.getElementById('header').innerHTML = timeLeft;
  }, 1000);
};
// create all of the questions and ansers for the quiz
var myQuestions = [
  {
    question: 'What is used to style a webpage',
    answers: {
      a: 'HTML',
      b: 'CSS',
      c: 'JavaScript',
    },
    correctAnswer: 'CSS',
  },
  {
    question: 'Which of these is correct',
    answers: {
      a: 'index(HTML)',
      b: 'html-index',
      c: 'index.html',
    },
    correctAnswer: 'index.html',
  },
  {
    question: 'What tool is used to test javascript',
    answers: {
      a: 'google',
      b: 'youtube',
      c: 'devtools',
    },
    correctAnswer: 'devtools',
  },
];

var startQuiz = function () {
  populateQuestion();
};
function populateQuestion() {
  if (currentQuestion < myQuestions.length) {
    question1.textContent = myQuestions[currentQuestion].question;
    answerButton1.textContent = myQuestions[currentQuestion].answers.a;
    answerButton2.textContent = myQuestions[currentQuestion].answers.b;
    answerButton3.textContent = myQuestions[currentQuestion].answers.c;
  }
}
answerContainer.addEventListener('click', (e) => {
  if (timeLeft > 0) {
    if (e.target.tagName === 'BUTTON' && quizStarted === true) {
      if (e.target.textContent === myQuestions[currentQuestion].correctAnswer) {
        currentQuestion++;
        console.log(currentQuestion);
        populateQuestion();
        answerButton1.classList.remove('btn-danger');
        answerButton2.classList.remove('btn-danger');
        answerButton3.classList.remove('btn-danger');
      } else {
        e.target.classList.add('btn-danger');
        timeLeft -= 10;
      }
    }
    if (currentQuestion === myQuestions.length) {
      question1.textContent = 'CONGRATULATIONS';
      answerButton1.classList.add('btn-success');
      answerButton2.classList.add('btn-success');
      answerButton3.classList.add('btn-success');
      leaderBoard += initials + timeLeft;
      clearInterval(intervalId);
      localStorage.setItem('High Score', leaderBoard);
      HighScoreText.textContent = 'High Score: ' + leaderBoard;
    }
  }
});

startButton.addEventListener('click', () => {
  startButton.classList.add('disabled');
  populateQuestion();
  quizStarted = true;
  runTimer();
});

highScore = localStorage.getItem('High Score');
console.log(highScore);
