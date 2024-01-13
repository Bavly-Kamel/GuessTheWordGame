// setting game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
// document.querySelector("footer").innerHTML = `${gameName} Game &copy created by <a href="https://www.facebook.com/bavly.kamel.16" target="_blank">Bavly Kamel</a>`;

// setting gamee options
let numbersOfTries = 6;
let numbersOfletters = 6;
let currentTry = 1;
let numberOfHints = 3;

// Mange Words 
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School", "Bavly.", "Sunset", "Marvel", "Castle", "Spirit", "Spirit", "Silver", "Impact", "Winter", "Breeze", "Horizon", "Radios", "Effort", "Kettle"]
wordToGuess = words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();
let messageArea = document.querySelector(".message")
//console.log(wordToGuess)


// Mange Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);



function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    // creat main try div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("dissabled");

        // creat inputs
        for (let j = 1; j <= numbersOfletters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input)
        }
        
        inputsContainer.appendChild(tryDiv);
    }
    // fouces on first input in first try Element    
    inputsContainer.children[0].children[1].focus();

    // Disable All Inputs Except first one
    const inputsInDissaledDiv = document.querySelectorAll(".dissabled input");
    inputsInDissaledDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) =>  {
        // convert input to uppercase
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            // console.log(index);
            const nextInput = inputs[index +1 ];
            if (nextInput) nextInput.focus();
        });
    
        
        input.addEventListener("keydown", function (event) {
            // console.log(event)
            const currentIndex = Array.from(inputs).indexOf(event.target) // or this
            // console.log(currentIndex)
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus()
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus()
            }
        });
    });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess)

function handleGuesses() {
    let succesGuess = true;
    console.log(wordToGuess)
    for (let i = 1; i <= numbersOfletters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter = inputField.value.toLocaleLowerCase()
        // console.log(letter);
        const actualLetter = wordToGuess[i - 1];

        // Game Logic
        if (letter === actualLetter) {
            // letter is correct and in place
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            // letter is correct and not place
            inputField.classList.add("not-in-place");
            succesGuess = false;
        } else {
            // letter is wrong
            inputField.classList.add("no");
            succesGuess = false;
        }
    }

    // check if user win or lose
    if (succesGuess) {
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
        if (numberOfHints === 2) {
            messageArea.innerHTML = `<p>Congrats You Didn't use Hints</p>`;

        }
        // add Disabled class on All Try Divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("dissabled"));

        // Disable Guess Button 
        guessButton.disabled = true;
        getHintButton.disabled = true;
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("dissabled");
        const currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInput.forEach((input) => (input.disabled = true));

        currentTry++;

        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
        
        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            document.querySelector(`.try-${currentTry}`).classList.remove("dissabled");
            el.children[1].focus();
        } else {
            guessButton.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose The Word is <span>${wordToGuess}</span>`;
        }

    }
}

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints --;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) {
        getHintButton.disabled = true
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs);
    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        // console.log(randomIndex)
        // console.log(randomInput)
        // console.log(indexToFill)

        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase()
        }
    }
}
function handleBackspace() {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentIndex)
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
}

document.addEventListener("keydown" ,handleBackspace)

window.onload = function() {
    generateInput();
}