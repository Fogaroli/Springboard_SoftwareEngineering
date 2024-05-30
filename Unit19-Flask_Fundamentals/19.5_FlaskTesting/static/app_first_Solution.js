//Global variables

//================================================================
//Feature Functions
$sendWordForm = $("#send-word");
$submitButton = $("form button");
$wordInput = $("#word-input");
$dialog = $("#dialogBanner");
$closeDialog = $("#closeDialog");
$notification = $("#notification");
$score = $("#currentScore span");
$record = $("#record");
$gamesPlayed = $("#playedtimes");
$timer = $("#timer span");
let timerFunction;
const words = [];

//================================================================
//DOM Manupulation Functions

$sendWordForm.on("submit", (evt) => {
    evt.preventDefault();
    const submittedWord = $wordInput.val().toLowerCase();
    if (words.includes(submittedWord)) {
        $notification.text("You already tried that one");
        showBanner();
        $wordInput.val("");
    } else {
        words.push(submittedWord);
        processWord(submittedWord);
        $wordInput.val("");
    }
});

$closeDialog.on("click", hideBanner);

function showBanner() {
    $dialog.css("display", "block");
    setTimeout(hideBanner, 3000);
}

function hideBanner() {
    $dialog.css("display", "none");
}

function updatePoints(word) {
    const points = +$score.text() + word.length;
    $score.text(points);
}

function gameTimer() {
    if ($timer.text() > 0) {
        $timer.text($timer.text() - 1);
    } else {
        clearInterval(timerFunction);
        $notification.text(
            `Sorry Time is up, you made ${$score.text()} points`
        );
        showBanner();
        $wordInput.prop("disabled", true);
        $submitButton.prop("disabled", true);
        saveData($score.text());
    }
}

window.onload = function () {
    timerFunction = setInterval(gameTimer, 1000);
};

function updateScore(record, games) {
    $gamesPlayed.text(games);
    $record.text(record);
}

//================================================================

async function processWord(word) {
    console.debug("processWord function");
    const response = await axios({
        url: "/word",
        method: "POST",
        data: { word: word },
    }).catch((err) => {
        $notification.text("Error connecting to the server, please try again");
        showBanner();
        return err;
    });
    if (response instanceof Error) {
        return;
    }
    if (response.data["result"] === "ok") {
        $notification.text("Good job, you identified a word in the board");
        showBanner();
        updatePoints(word);
    } else if (response.data["result"] === "not-on-board") {
        $notification.text("uhhhh, that word is not on the board");
        showBanner();
    } else if (response.data["result"] === "not-a-word") {
        $notification.text("Hey, that is not a word");
        showBanner();
    } else {
    }
}

async function saveData(score) {
    const response = await axios({
        url: "/save",
        method: "POST",
        data: { score: score },
    }).catch((err) => {
        $notification.text("Error updating point record");
        showBanner();
        return err;
    });
    if (response instanceof Error) {
        return;
    }
    updateScore(response.data["record"], response.data["played-times"]);
}
