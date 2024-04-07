function main() {
    const CARDS = [
        "card1",
        "card2",
        "card3",
        "card4",
        "card5",
        "card6",
        "card7",
        "card8",
        "card9",
        "card10",
    ];

    /*
  This is a helper function to shuffle an array
  it returns the same array with values shuffled
  it is based on an algorithm called Fisher Yates if you want ot research more
  */
    function shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    /*
  This function loops over the array of cards
  Spreads the cards over the gameBoard table
  it also adds an event listener for a click for each card
  */
    function distributeCards(cardsArray) {
        for (let i = 0; i < cardsArray.length; i++) {
            gameCards[i].dataset.cardType = cardsArray[i];
            gameCards[i].classList.add(cardsArray[i]);
            gameCards[i].parentElement.addEventListener(
                "click",
                handleCardClick
            );
        }
    }

    /*
  This function checks the number of cards that has been flipped on this round
  flipped cards have a binary custom atribute se to true
  */
    function countInGame() {
        let counter = 0;
        for (let card of gameCards) {
            if (card.dataset.in_game) {
                counter++;
            }
        }
        return counter;
    }

    /*
  This function reverts non-matching cards
  */
    function clearBoard() {
        for (let card of gameCards) {
            if (card.dataset.in_game === "true") {
                card.parentElement.classList.remove("flipped");
                card.removeAttribute("data-in_game");
            }
        }
    }

    /*
  This function checks if all cards were flipped and call the end of the game
  Saving the score in the local storage
  */
    function evaluateGame() {
        for (let card of gameCards) {
            if (!card.dataset.scored) {
                return;
            }
        }
        if (localStorage.hasOwnProperty("record")) {
            if (Number(localStorage.record) > scoredPoints) {
                localStorage.record = scoredPoints;
                score.innerHTML = "NEW RECORD!<br>" + scoredPoints;
                updateRecord(true);
            } else {
                score.innerHTML = "Well Done<br>Final Score<br>" + scoredPoints;
            }
        } else {
            localStorage.record = scoredPoints;
            recordBox.innerText = "Lowest Score";
            updateRecord(false);
        }
        startButton.innerText = "Restart";
        startButton.style.color = "black";
        gameStart = false;
    }

    /*
  This function checks if the flipped cards are a match
  If they are a match cards stay face up and a new custom attribute 'scored' is set.
  If they are not a match cards are flipped back face down.
  */
    function evaluateCards() {
        let flippedCards = [];
        for (let card of gameCards) {
            if (card.dataset.in_game === "true") {
                flippedCards.push(card);
            }
        }
        if (
            flippedCards[0].dataset.cardType ===
            flippedCards[1].dataset.cardType
        ) {
            for (let card of gameCards) {
                if (card.dataset.in_game === "true") {
                    card.dataset.scored = "true";
                    card.removeAttribute("data-in_game");
                }
            }
            setTimeout(evaluateGame, 500);
        } else {
            setTimeout(clearBoard, 1000);
        }
    }

    /*
  This function is execited once the user clicks on any of the cards.
  This function is executed in the callback of the event listener
  */
    function handleCardClick(event) {
        //Once the card is clicked we need to check if it was clicled previouly and if we don't have already 2 cards fliped.
        if (countInGame() < 2) {
            try {
                if (
                    !event.target.nextElementSibling.dataset.in_game &&
                    !event.target.nextElementSibling.dataset.scored
                ) {
                    event.target.nextElementSibling.dataset.in_game = "true";
                    event.target.parentElement.classList.add("flipped");
                    scoredPoints++;
                    score.innerHTML = scoredPoints;
                }
            } catch (typeError) {
                // This error is expected because once the cards are flipped the target element becomes the card face, which does not have a nextElementSibling
            }
            if (countInGame() >= 2) {
                evaluateCards();
            }
        }
    }

    // Function to start the game
    function start() {
        if (!gameStart) {
            for (let card of gameCards) {
                card.parentElement.removeEventListener(
                    "click",
                    handleCardClick
                );
                if (card.dataset.scored) {
                    card.removeAttribute("data-scored");
                    card.parentElement.classList.remove("flipped");
                    card.removeAttribute("data-cardType");
                }
            }
            let shuffledCards = shuffle(cardPairs);
            distributeCards(shuffledCards);
            scoredPoints = 0;
            distributeCards(cardPairs);
            gameStart = true;
            startButton.style.color = "gray";
            score.innerText = scoredPoints;
        }
    }

    function updateRecord(update) {
        if (update) {
            const recordValue = document.querySelector("#recordValue");
            recordValue.innerText = scoredPoints;
        } else {
            let recValue = document.createElement("p");
            recValue.innerText = localStorage.record;
            recValue.id = "recordValue";
            recValue.style.fontSize = "20px";
            recValue.style.color = "red";
            recordBox.appendChild(recValue);
        }
    }

    // This is where the code starts running once DOM is loaded

    // Variable
    const gameContainer = document.getElementById("game");
    const score = document.querySelector(".score");
    const gameCards = document.querySelectorAll(".cards");
    const startButton = document.querySelector("button");
    const recordBox = document.querySelector("#record");

    let gameStart = false;
    let cardPairs = CARDS.concat(CARDS);
    let scoredPoints = 0;

    //Execution
    score.innerText = "Press Start";
    startButton.addEventListener("click", start);

    if (localStorage.hasOwnProperty("record")) {
        updateRecord(false);
    } else {
        recordBox.innerText = "No Record Found";
    }
}

document.addEventListener("DOMContentLoaded", main);
