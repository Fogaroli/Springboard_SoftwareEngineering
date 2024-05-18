/*
Title: Madlibs Flask Exercise
Author: Fabricio Ribeiro
Date: May 17, 2024
*/

//Global variables

//================================================================
//Feature Functions

//================================================================
//DOM Manupulation Functions

const $selectStoryForm = $("#select_story");
const $nextButton = $("#story-selection-next");

const $storyForm = $("#story-form");
const $submitStoryButton = $("#submit-story");

$nextButton.on("click", function (evt) {
    evt.preventDefault();
    const story_id = $("#story_id_selection").val();
    if (story_id === "0") {
        return;
    }
    $selectStoryForm.attr("action", `/form/${story_id}`);
    $selectStoryForm.submit();
    return;
});

$submitStoryButton.on("click", (evt) => {
    evt.preventDefault();
    $formInputs = $("input");
    for (let i = 1; i < $formInputs.length; i++) {
        if ($formInputs[i].value.length < 3) {
            alert("All answers should be at least 3 characters long");
            return;
        }
    }
    $storyForm.submit();
    return;
});

//================================================================
