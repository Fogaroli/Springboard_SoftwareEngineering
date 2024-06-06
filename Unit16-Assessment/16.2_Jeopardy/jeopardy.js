// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const baseURL = "https://jeopardy-api-08c22fd2e683.herokuapp.com/api";

function throwError(err) {
    $("body div").remove();
    $("body").append(
        $("<div>", { text: "OOPS error reading data, please try again" })
    );

    $("button").text("Restart");
}

/** getCategoryIds
 * This function connects to the jeopardy API and collect available categories
 * Returns an array with all Id of the available categories.
 */
async function getCategoryIds() {
    try {
        const allCategories = await axios.get("/categories", { baseURL });
        const categoriesIDs = allCategories.data.categories.map(
            (object) => object.id
        );
        return categoriesIDs;
    } catch (err) {
        throwError(err);
    }
}

/** getCategory(Id)
 *
 * This functions connects to the API and collectes the tytle and clues for
 * the given category.
 *
 * Return object:
 *
 *  Returns { title: "Math", clues: clueArray }
 *
 * Where clueArray is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
    try {
        const categoryData = await axios.get(`/details/${catId}`, { baseURL });
        const title = categoryData.data.details[catId]["title"];
        const cluesArray = categoryData.data.details[catId]["clues"];
        const clues = cluesArray.map((object) => {
            let { question, answer } = object;
            return { question, answer, showing: null };
        });
        return { title, clues };
    } catch (err) {
        throwError(err);
    }
}

/**
 * fullTable
 *
 * This function fills the table element skeleton created during page load.
 * Filling the #titleRow with the categories and #gameBoard with clues.
 *
 * Data extracted from categories array.
 */
function fillTable() {
    if (categories.length === 0) {
        return;
    }
    $("#titles").append($("<tr>", { id: "titleRow" }));
    $titlesBlock = $("#titleRow");
    for (let column = 0; column < 6; column++) {
        $titlesBlock.append(
            $("<th>", {
                id: `title${column}`,
                class: "headers",
                html: categories[column].title,
            })
        );
    }
    $gameBoardBlock = $("#gameBoard");
    for (let line = 0; line < 5; line++) {
        $gameBoardBlock.append($("<tr>", { id: `line${line}` }));
        for (let column = 0; column < 6; column++) {
            $(`#line${line}`).append(
                $("<td>", {
                    id: `${line}${column}`,
                    class: "clues",
                    html: '<i class="fa-regular fa-circle-question fa-3x"></i>',
                })
            );
        }
    }
}

/** handleClick
 *
 * This function is executed when the user clicks on any of the clues td elments
 *
 * Use .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick(evt) {
    const cellId = evt.target.closest("td").id;
    const [clue, title] = cellId.split("");
    let currentState = categories[title]["clues"][clue].showing;
    let question = categories[title]["clues"][clue].question;
    let answer = categories[title]["clues"][clue].answer;
    if (!currentState) {
        $(`#${cellId}`).html(question);
        categories[title]["clues"][clue].showing = "question";
    } else if (currentState === "question") {
        $(`#${cellId}`).html(answer).addClass("done");
        categories[title]["clues"][clue].showing = "answer";
    }
}

/**showLoadingView
 *
 * Wipe the current Jeopardy game table element, show the loading spinner,
 * and update the button used to fetch data.
 */
function showLoadingView() {
    $("body div").remove();
    $("#titles").empty();
    $("#gameBoard").empty();
    $("button").text("Loading");
    $("body").append(
        $("<div>").append(
            $("<i>", { class: "fa-solid fa-spinner fa-spin loadingIcon" })
        )
    );
}

/** hideLoadingView
 * Remove the loading spinner and update the button used to fetch data.
 */
function hideLoadingView() {
    $("body div").remove();
    $("button").text("Restart");
}

/** shuffleSix
 *
 * Shuffles the array passed on to the function and returns
 * an array with random 6 elements.
 * Used to select random 6 gategory Ids for the game.
 */
function shuffleSix(array) {
    for (let counter = array.length - 1; counter > 0; counter--) {
        let index = Math.floor(Math.random() * counter);
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array.slice(1, 7);
}

/** setupAndStart
 *
 * Main function to start the game.
 * Should execute the steps:
 * - get array with available category Ids
 * - fhuffle and select 6 ramdom category Ids
 * - get data for each category
 * - fill the HTML table element
 * - hide loading view
 * */
async function setupAndStart() {
    const allIDs = await getCategoryIds();
    const selectedCategories = shuffleSix(allIDs);
    for (let item of selectedCategories) {
        const catDetail = await getCategory(item);
        categories.push(catDetail);
    }
    fillTable();
    hideLoadingView();
}

/** startGame
 * function executed when the button is clicked.
 * Erases any previous game, show the loading view and load a new game.
 */
function startGame() {
    $("#titles").empty();
    $("gameBoard").empty();
    showLoadingView();
    setupAndStart();
}

/** On page load
 * Create basic HTML elements
 * add event handler for start button and clicking clues.
 */
$("body").append($("<h1>", { text: "Jeopardy!!" }));
$("body").append($("<button>", { text: "Start", id: "start" }));
$("body").append(
    $("<table>")
        .append($("<thead>", { id: "titles" }))
        .append($("<tbody>", { id: "gameBoard" }))
);
$("#start").on("click", startGame);
$("#gameBoard").on("click", handleClick);
