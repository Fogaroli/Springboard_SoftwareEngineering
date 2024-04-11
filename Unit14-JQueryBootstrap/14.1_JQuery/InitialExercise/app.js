/*
Title: DOm manipulation using JQuery
Author: Fabricio Ribeiro
Date: April 10, 2024
*/

// 1. When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”

$(function () {
    console.log("Let’s get ready to party with jQuery!");
});

$(document).ready(function () {
    console.log("Let’s get ready to party with jQuery!");
});

// 2. Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).

$("article img").addClass("image-center");

// 3. Remove the last paragraph in the article.

$("p").last().remove();

// $("article p:last-child").remove();

// 4. Set the font size of the title to be a random pixel size from 0 to 100.

$("#title").css("font-size", Math.random() * 100);

// 5. Add an item to the list; it can say whatever you want.

$("ol").append($("<li>").text("Whatever you want"));

// 6. Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.

$("aside")
    .empty()
    .append($("<p>", { text: "I am sorry I had a silly list aside" }));

// 7. When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.

$("input").on("input", function () {
    $("body").css(
        "background-color",
        `RGB(${$("input").eq(0).val()},${$("input").eq(2).val()},${$("input")
            .eq(1)
            .val()})`
    );
});

// 8. Add an event listener so that when you click on the image, it is removed from the DOM.

$("img").on("click", function (evt) {
    $(evt.target).remove();
});
