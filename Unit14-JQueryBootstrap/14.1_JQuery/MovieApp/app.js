/*
Title: 
Author: 
Date: 
*/

//Global variables
const $submitButton = $("#submit");
let sortDirection = "ascending";

//================================================================
//Feature Functions

function sortArray(array, topic) {
    return array.sort(function (a, b) {
        if (topic === "rating") {
            a[topic] = +a[topic];
            b[topic] = +b[topic];
        }
        if (a[topic] > b[topic]) {
            return sortDirection === "ascending" ? 1 : -1;
        } else if (b[topic] > a[topic]) {
            return sortDirection === "ascending" ? -1 : 1;
        }
        return 0;
    });
}

//================================================================
//DOM Manupulation Functions

//function to add ne wmovie to the list
$submitButton.on("click", function (evt) {
    evt.preventDefault();
    const $movieInput = $("#titleInput").val();
    const $ratingInput = $("#ratingInput").val();
    if ($movieInput.trim().length >= 2 && /^([0-9]|10)$/.test($ratingInput)) {
        $("table").append(newTR($movieInput, $ratingInput));
        $("input").val("");
    } else {
        alert("Enter a valid movie title and a rating");
    }
});

//Event to remove movie form the list
$("table").on("click", "button", function (evt) {
    $(evt.target).closest("tr").remove();
});

//event to sort the movie list
$("th").on("click", function (evt) {
    const movieArray = [];
    const $allMovies = $(evt.target).parent().nextAll();
    $($allMovies).each(function (index, value) {
        movieArray.push({
            movie: $(value).children().eq(0).text(),
            rating: $(value).children().eq(1).text(),
        });
    });
    const orderedArray = sortArray(
        movieArray,
        $(evt.target).text().toLowerCase()
    );
    $("tr").eq(0).nextAll().remove();
    orderedArray.forEach((element) =>
        $("table").append(newTR(element["movie"], element["rating"]))
    );
    sortDirection = sortDirection === "ascending" ? "descending" : "ascending";
});

//function to create HTML content to add new movie to the table.
function newTR(movie, rating) {
    const tr = $("<tr>").append([
        $("<td>", { text: movie }),
        $("<td>", { text: rating }),
        $("<td>").append(
            $("<button>", { class: "deleteButton", text: "Remove" })
        ),
    ]);
    return tr;
}

//================================================================
