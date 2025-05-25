const quoteSection = document.getElementById("quote"),
      userInput = document.getElementById("quote-input");

let time = 60;
let timer = "";
let mistakes = 0;

function renderNewQuote() {
    quoteSection.innerHTML = ""; // clear previous quote
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").forEach(char => {
        let span = `<span class="quote-chars">${char}</span>`;
        quoteSection.innerHTML += span;
    });
}

window.onload = () => {
    userInput.value = "";
    document.getElementById("startbtn").style.display = "block";
    document.getElementById("stopbtn").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}

function startGame() {
    mistakes = 0;
    time = 60;
    clearInterval(timer);

    userInput.disabled = false;
    userInput.value = "";
    quoteSection.innerHTML = "";
    renderNewQuote();

    document.getElementById("mistakes").innerText = 0;
    document.getElementById("timer").innerText = "60s";
    document.querySelector(".results").style.display = "none";
    document.getElementById("startbtn").style.display = "none";
    document.getElementById("stopbtn").style.display = "block";

    userInput.focus();
    timer = setInterval(updateTimer, 1000);
}

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    let userInputChars = userInput.value.split("");

    quoteChars.forEach((char, index) => {
        if (userInputChars[index] == null) {
            char.classList.remove("pass", "fail");
        } else if (char.innerText === userInputChars[index]) {
            char.classList.add("pass");
            char.classList.remove("fail");
        } else {
            if (!char.classList.contains("fail")) {
                mistakes++;
                char.classList.add("fail");
            }
            char.classList.remove("pass");
        }
    });

    document.getElementById("mistakes").innerText = mistakes;

    let check = Array.from(quoteChars).every(char => char.classList.contains("pass"));
    if (check) displayResults();
});

function displayResults() {
    clearInterval(timer);
    userInput.disabled = true;
    document.getElementById("stopbtn").style.display = "none";
    document.getElementById("startbtn").style.display = "block";
    document.querySelector(".results").style.display = "block";

    const totalChars = userInput.value.length;
    const timeTaken = (60 - time) / 60;
    const wpm = timeTaken > 0 ? (totalChars / 5 / timeTaken).toFixed(2) : 0;
    const accuracy = totalChars > 0 ? Math.round(((totalChars - mistakes) / totalChars) * 100) : 0;

    document.getElementById("wpm").innerText = `${wpm} wpm`;
    document.getElementById("accuracy").innerText = `${accuracy}%`;
    document.getElementById("mistake").innerText = mistakes;
}

function updateTimer() {
    if (time <= 0) {
        displayResults();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}
