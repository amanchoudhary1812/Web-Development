let n1, n2, opSelector, ansOpt, answer, t;

// Elements
let qNo = document.getElementById("Qno");
let score = document.getElementById("score");
let question = document.getElementById("question");
let buttons = document.getElementsByTagName("button");
let startBox = document.getElementById("start-game");
let gameBox = document.getElementById("in-game");
let endBox = document.getElementById("end-game");
let progress = document.getElementById("progress");
let fScore = document.getElementById("final-score");
let message = document.getElementById("message");
let operator = ['+', '-', '*', '/'];

// Restart the game
function restart() {
    score.innerHTML = "0";
    qNo.innerHTML = "0";
    nextQuestion();

    gameBox.style.display = "block";
    startBox.style.display = "none";
    endBox.style.display = "none";
    progress.style.width = "100%";
}

// When the game is finished
function whenFinished() {
    clearInterval(t);
    gameBox.style.display = "none";
    startBox.style.display = "none";
    endBox.style.display = "flex";

    fScore.innerHTML = score.innerHTML; // Show the final score
    lastMessage(); // Show motivational message
}

// Generate the next question
function nextQuestion() {
    clearInterval(t); // Clear any previous timer
    progress.style.width = "100%"; // Reset progress bar
    timed(); // Start a new timer

    if (qNo.innerText == "10") { // End the game after 10 questions
        whenFinished();
        return;
    }

    n1 = Math.floor(Math.random() * 100);
    n2 = Math.floor(Math.random() * 100);
    opSelector = operator[Math.floor(Math.random() * 4)];

    if (opSelector == "/") {
        while (n1 % n2 !== 0 || n1 === 0 || n2 === 0 || n2 === 1 || n1 === n2) {
            n1 = Math.floor(Math.random() * 100);
            n2 = Math.floor(Math.random() * 100);
        }
    }

    if (opSelector == "*") {
        while (n1 * n2 > 1000) {
            n1 = Math.floor(Math.random() * 50);
            n2 = Math.floor(Math.random() * 50);
        }
    }

    question.innerHTML = `${n1} ${opSelector} ${n2} = ?`;
    answer = eval(`${n1} ${opSelector} ${n2}`);
    getOptions();
    incrementQNo();
}

// Generate answer options
function getOptions() {
    ansOpt = Math.floor(Math.random() * 4);
    buttons[ansOpt].innerHTML = answer;

    for (let i = 0; i < 4; i++) {
        if (i !== ansOpt) {
            buttons[i].innerHTML = Math.floor(Math.random() * 200) - 50;
        }
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
}

// Increment question number
function incrementQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
}

// Update score for correct answers
function updateScore() {
    score.innerHTML = parseInt(score.innerHTML) + 10; // Add 10 marks for correct answers
}

// Display message at the end
function lastMessage() {
    if (fScore.innerText >= 80) {
        message.innerHTML = "WOW !! UNBELIEVABLE !! &#128525;";
    } else if (fScore.innerText >= 50) {
        message.innerHTML = "TOO CLOSE !! &#128531;";
    } else if (fScore.innerText >= 20) {
        message.innerHTML = "Better luck next time &#128549;";
    } else {
        message.innerHTML = "Bad Luck &#128577;";
    }
}

// Timer logic
function timed() {
    let timeLeft = 60; // Total time in seconds
    progress.style.width = "100%"; // Reset the progress bar width to full

    t = setInterval(() => {
        timeLeft--;
        progress.style.width = (timeLeft / 60) * 100 + "%"; // Adjust width proportionally

        if (timeLeft <= 0) {
            clearInterval(t);
            nextQuestion();
        }
    }, 1000); // Update every second
}

// Button click events
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        clearInterval(t); // Stop the timer
        if (parseInt(buttons[i].innerHTML) === answer) {
            buttons[i].style.backgroundColor = "green";
            buttons[i].style.color = "#fff";
            updateScore(); // Update the score if correct
        } else {
            buttons[i].style.backgroundColor = "red";
            buttons[i].style.color = "#fff";
        }

        setTimeout(nextQuestion, 2000); // Delay for 2 seconds
    });
}
