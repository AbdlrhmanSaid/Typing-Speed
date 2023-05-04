const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
// Defult Level
let defultLevelName = "Normal"; // change level from here
let defultLevelSeconds = lvls[defultLevelName];

// catch selectors
let cont = document.querySelector(".container");
let startBtn = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let SecondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let finishMessage = document.querySelector(".finsh");
let scoreTotal = document.querySelector(".score .total");

// seeting lvl name + sec +  score
lvlNameSpan.innerHTML = defultLevelName;
SecondsSpan.innerHTML = defultLevelSeconds;
timeLeftSpan.innerHTML = defultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event
input.onpaste = function () {
  return false;
};

// start game
startBtn.onclick = function () {
  this.remove();
  input.focus();
  // generate word function
  genWord();
};

function genWord() {
  // get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get index word
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  // show random word
  theWord.innerHTML = randomWord;
  // empty upcoming words
  upcomingWords.innerHTML = "";
  // Generate words
  for (let i = 0; i < words.length; i++) {
    // Create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // call start play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // empty input field
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // call gen function
          genWord();
        } else {
          // remove upcoming words
          upcomingWords.remove();
          // create span
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("Grate");
          span.appendChild(spanTxt);
          let btn = document.createElement("button");
          btn.innerHTML = "Again";
          finishMessage.appendChild(span);
          finishMessage.appendChild(btn);
          finishMessage.style.display = "block";
          finishMessage.style.borderColor = "--main-colro";
          cont.classList.add("blur");
          btn.onclick = function Again() {
            location.reload();
          };
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        let btn = document.createElement("button");
        btn.innerHTML = "Again";
        btn.style.backgroundColor = "red";
        finishMessage.appendChild(span);
        finishMessage.appendChild(btn);
        finishMessage.style.display = "block";
        finishMessage.style.borderColor = "#f77878";
        cont.classList.add("blur");
        btn.onclick = function Again() {
          location.reload();
        };
      }
    }
  }, 1000);
}
