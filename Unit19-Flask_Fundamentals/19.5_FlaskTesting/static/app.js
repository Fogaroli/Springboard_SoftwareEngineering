//Global variables

//================================================================
//Feature Functions
$sendWordForm = $("#send-word");
$submitButton = $("form button");
$wordInput = $("#word-input");
$dialog = $("#dialogBanner");
$notifications = $("#notifications");
$score = $("#currentScore span");
$record = $("#record");
$gamesPlayed = $("#playedtimes");
$timer = $("#timer span");

//================================================================
//DOM Manupulation Functions

class Game {
    constructor() {
        this.score = 0;
        this.words = [];
        this.timerFunction = null;
        this.gameTimer = this.gameTimer.bind(this);
        this.submitWord = this.submitWord.bind(this);
    }

    async submitWord(evt) {
        evt.preventDefault();
        const submittedWord = $wordInput.val().toLowerCase();
        if (this.words.includes(submittedWord)) {
            this.printNotification("You already tried that one");
            $wordInput.val("");
        } else {
            this.words.push(submittedWord);
            const response = await this.processWord(submittedWord);
            if (response === "ok") {
                this.printNotification(
                    "Good job, you identified a word in the board"
                );
                this.updatePoints(submittedWord);
            } else if (response === "not-on-board") {
                this.printNotification("uhhhh, that word is not on the board");
            } else if (response === "not-a-word") {
                this.printNotification("Hey, that is not a word");
            } else {
                this.printNotification(
                    "Sorry, something wrong with the server, your word was not processed"
                );
            }
            $wordInput.val("");
        }
    }

    updatePoints(word) {
        const points = +$score.text() + word.length;
        $score.text(points);
    }

    printNotification(text) {
        const id = Math.floor(Math.random() * 100 + 1);
        const div = $("<div>", { class: "dialog", id: id });
        // const icon = $("<i>", { class: "close fa-solid fa-trash-can fa-sm" });
        const icon = $("<span>", {
            class: "close fa-solid fa-trash-can fa-sm",
        });
        const p = $("<b>", { text: text });
        icon.on("click", function (evt) {
            evt.target.parentElement.remove();
        });
        div.append(p).append(icon);
        setTimeout(() => {
            $(`#${id}`).remove();
        }, 3000);
        $notifications.append(div);
    }

    gameTimer() {
        if ($timer.text() > 0) {
            $timer.text($timer.text() - 1);
        } else {
            clearInterval(this.timerFunction);
            this.printNotification(
                `Sorry Time is up, you made ${$score.text()} points`
            );
            $wordInput.prop("disabled", true);
            $submitButton.prop("disabled", true);
            this.saveData($score.text());
        }
    }

    updateScore(record, games) {
        $gamesPlayed.text(games);
        $record.text(record);
    }

    //================================================================

    async processWord(word) {
        const response = await axios({
            url: "/word",
            method: "POST",
            data: { word: word },
        }).catch((err) => {
            this.printNotification(
                "Error connecting to the server, please try again"
            );
            return err;
        });
        if (response instanceof Error) {
            return;
        }
        return response.data["result"];
    }

    async saveData(score) {
        const response = await axios({
            url: "/save",
            method: "POST",
            data: { score: score },
        }).catch((err) => {
            this.printNotification("Error updating point record");
            return err;
        });
        if (response instanceof Error) {
            return;
        }
        this.updateScore(
            response.data["record"],
            response.data["played-times"]
        );
    }
}

const boogleGame = new Game();

window.onload = function () {
    boogleGame.timerFunction = setInterval(boogleGame.gameTimer, 1000);
};

$sendWordForm.on("submit", boogleGame.submitWord);
