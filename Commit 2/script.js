let n1, n2, opSelector, ansOpt, answer, t;
let difficultyLevel = 1;  // Difficulty starts at level 1

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
    difficultyLevel = 1; // Reset difficulty level
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

    n1 = Math.floor(Math.random() * (difficultyLevel * 100));  // Increase number range with difficulty
    n2 = Math.floor(Math.random() * (difficultyLevel * 100));

    opSelector = operator[Math.floor(Math.random() * 4)];

    // Increase complexity with difficulty level (e.g., higher numbers for division and multiplication)
    if (opSelector === "/") {
        while (n1 % n2 !== 0 || n1 === 0 || n2 === 0 || n2 === 1 || n1 === n2) {
            n1 = Math.floor(Math.random() * (difficultyLevel * 100));
            n2 = Math.floor(Math.random() * (difficultyLevel * 100));
        }
    }

    if (opSelector === "*") {
        while (n1 * n2 > difficultyLevel * 1000) {
            n1 = Math.floor(Math.random() * (difficultyLevel * 50));
            n2 = Math.floor(Math.random() * (difficultyLevel * 50));
        }
    }

    question.innerHTML = `${n1} ${opSelector} ${n2} = ?`;
    answer = eval(`${n1} ${opSelector} ${n2}`);
    getOptions();
    incrementQNo();
}

// Generate answer options
function getOptions() {
    const options = [
        answer,
        answer + Math.floor(Math.random() * 5),
        answer + Math.floor(Math.random() * 3),
        answer - Math.floor(Math.random() * 5)
    ];

    // Shuffle the options randomly
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Assign shuffled options to buttons
    for (let i = 0; i < 4; i++) {
        buttons[i].innerHTML = options[i];
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

// Quit game function
function quitGame() {
    clearInterval(t); // Stop any active timers
    gameBox.style.display = "none"; // Hide the in-game section
    startBox.style.display = "block"; // Show the start screen
    qNo.innerHTML = "0"; // Reset the question number
    score.innerHTML = "0"; // Reset the score
    progress.style.width = "100%"; // Reset progress bar
    difficultyLevel = 1; // Reset difficulty
}

// Attach the quit button functionality
let quitBtn = document.getElementById("quit-btn");
quitBtn.addEventListener('click', quitGame);

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

        // Increase difficulty every 3 questions (or adjust based on your preference)
        if (parseInt(qNo.innerHTML) % 3 === 0) {
            difficultyLevel++;
        }

        setTimeout(nextQuestion, 2000); // Delay for 2 seconds
    });
}
