// variables
const easy = document.getElementById("easy");
const missedWord = document.getElementById("missed-word");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const gameOverScore = document.getElementById("game-over-score")
const gameOver = document.getElementById("game-over")
const scoreDisplay = document.getElementById("score");
const createBr = document.createElement("br");
const test1 = document.getElementById("test");
const searchKanji = document.getElementById("search-kanji");
const resultSearch = document.getElementById("result-search");
const buttonSearch = document.getElementById("btn-search");
const startButton = document.getElementById("start-btn");
const answerInput = document.getElementById("answer");
const timer = document.getElementById("timer-red");
const timer1 = document.getElementById("timer");
const jpInput = document.getElementById("jp-input");
const listResults = document.getElementById("list-results");
const replay = document.getElementById("replay-btn");
const replayTwo = document.getElementById("replay-btn-two");
const jpWord = document.getElementById("jp-word");
const difficultySelect = document.getElementById("grade-select");
let difGrade = "grade-1";
let difficultyLevel = ""; 
let kanjiResult = "";
let meaningResult = "";
let kunReading = "";
let test2 = "";
let randomNbLength = 0;
let width = 0;
let score = 0;
let randomNb = 0;
let totalScore = 0;
let progressBar;
let inputTextValue;
let listOfWords = [];
let listOfMeaning = [];
let gradeOneArray = [];

// fetches selected grade kanji
function scrambleArray() {
    difGrade = difficultySelect.options[difficultySelect.selectedIndex].value;
   fetch(`https://kanjiapi.dev/v1/kanji/${difGrade}`)
   .then(res => res.json())
   .then(data => {
       gradeOneArray = data;
       randomNb = Math.floor(Math.random() * gradeOneArray.length + 1);
       if (difficultyLevel === "easy" || difficultyLevel === "medium" || difficultyLevel === "hard") {
       startButton.addEventListener("click", () => { 
           runProgressBar();
           startButton.style.display = "none";
           jpWord.innerHTML = gradeOneArray[randomNb];
           timer1.style.display = "block";
           fetchAWord();
   });
       }
});
}


// fetches random word from selected grade array
function fetchAWord() {
    fetch(`https://kanjiapi.dev/v1/words/${gradeOneArray[randomNb]}`)
                .then(res => res.json())
                .then(word => {
                    word.forEach(e => {
                        jpInput.addEventListener("keyup", () => {
                                if (e.variants[0].written === jpInput.value && jpInput.value.includes(gradeOneArray[randomNb])) {
                                    alert("Correct");
                                    listOfWords.push(jpInput.value);
                                    listOfMeaning.push(e.variants[0].pronounced);
                                    width = 0;
                                    timer.style.width = width + "%";
                                    score++;
                                    scoreDisplay.innerHTML = `${score} / ${totalScore}`;
                                    jpInput.value = "";
                                    randomNb = Math.floor(Math.random() * gradeOneArray.length +1);
                                    jpWord.innerHTML = gradeOneArray[randomNb];
                                    
                                    if (difficultyLevel === "easy" && score === 10) {
                                            ifScoreReached();
                                            // listOfWords.innerHTML = 
                                            for (let i = 0; i < 10; i++) {
                                                listResults.innerHTML += `<br> ${listOfWords[i]} 読み方ー ${listOfMeaning[i]} <br>`;
                                            }
                                            
                                        }
                                        else {
                                            fetchAWord();
                                            replay.style.display = "inline-block";
                                        }

                                    if (difficultyLevel === "medium" && score === 20) {

                                            ifScoreReached();
                                            for (let i = 0; i < 20; i++) {
                                                listResults.innerHTML += `<br> ${listOfWords[i]} 読み方ー ${listOfMeaning[i]} <br>`;
                                            }
                                        }
                                        else {
                                            fetchAWord();
                                            replay.style.display = "inline-block";
                                        }

                                    if (difficultyLevel === "hard" && score === 30) {
                                            ifScoreReached();
                                            for (let i = 0; i < 30; i++) {
                                                listResults.innerHTML += `br ${listOfWords[i]} 読み方ー ${listOfMeaning[i]} <br>`
                                            }
                                        }

                                        else {
                                            fetchAWord();
                                            replay.style.display = "inline-block";
                                        }
                        }

                    });
                
            });
});
}


// Score reached 
function ifScoreReached() {
    alert("Max score reached");
    jpWord.style.display = "none";
    jpInput.style.display = "none";
    console.log(listOfWords, listOfMeaning);
    clearInterval(progressBar);
    width = 0;
}

// choose difficulty
easy.addEventListener("click", () => {
    difficultyLevel = "easy";
    easy.classList.toggle("difficulty-clicked");
    totalScore = 10;
    
    
    if (medium.addEventListener || hard.addEventListener) {
        medium.classList.remove("difficulty-clicked");
        hard.classList.remove("difficulty-clicked");
        
}
});


medium.addEventListener("click", () => {
    difficultyLevel = "medium";
    medium.classList.toggle("difficulty-clicked");
    totalScore = 20;
    
    if (easy.addEventListener || hard.addEventListener) {
        easy.classList.remove("difficulty-clicked");
        hard.classList.remove("difficulty-clicked");
}
});

hard.addEventListener("click", () => {
    difficultyLevel = "hard";
    hard.classList.toggle("difficulty-clicked");
    totalScore = 30;

    if (medium.addEventListener || easy.addEventListener) {
        medium.classList.remove("difficulty-clicked");
        easy.classList.remove("difficulty-clicked");
}
});

// progress bar
function runProgressBar() {
    progressBar = setInterval(() => {
    if (width > 100) {
        fetch(`https://kanjiapi.dev/v1/kanji/${gradeOneArray[randomNb]}`)
        .then(res => res.json())
        .then(data => {
        clearInterval(progressBar);
        gameOver.style.display = "flex";
        gameOverScore.innerText = `${score} / ${totalScore}`;
        missedWord.innerHTML = `当たらなかった漢字は ${gradeOneArray[randomNb]} 読み方ー 訓 ${data.kun_readings} 音 ${data.on_readings}`;
    
        })
    
    } else {
        width++;
        timer.style.width = width + "%";
    }
    }, 100);
    }
// Select grade level
difficultySelect.addEventListener("change", scrambleArray);

// play again
replay.addEventListener("click", () => location.reload());
replayTwo.addEventListener("click", () => location.reload());