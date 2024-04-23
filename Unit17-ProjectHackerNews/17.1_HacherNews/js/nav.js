"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
    console.debug("navAllStories", evt);
    hidePageComponents();
    putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
    console.debug("navLoginClick", evt);
    hidePageComponents();
    $loginForm.show();
    $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show new story form on click on "submit" */
function navNewStoryClick(evt) {
    hidePageComponents();
    $newStoryForm.show();
    putStoriesOnPage();
}

$navNewStory.on("click", navNewStoryClick);

/** Show user favorite stories on click on "favorites" */
function navFavoritesClick(evt) {
    hidePageComponents();
    putFavoritesOnPage();
}

$navFavorites.on("click", navFavoritesClick);

/** Show list of stories criated by user on click on "my stories" */
function navMyStoriesClick(evt) {
    hidePageComponents();
    putMyStoriesOnPage();
}

$navMyStories.on("click", navMyStoriesClick);

/** Show user profile form on click on username */
function navUserProfileClick(evt) {
    hidePageComponents();
    const createdDate = new Date(currentUser.createdAt);
    $("#profile-name-label")
        .text(`Name: ${currentUser.name}`)
        .append(
            $("<i>", { class: "fa-solid fa-pen-to-square", id: "edit-name" })
        );
    $("#password-input").remove()
    $("#profile-username-label").text(`Username: ${currentUser.username}`);
    $("#profile-created-label").text(
        `Profile Created on: ${createdDate.toLocaleDateString()}`
    );
    $profileForm.show();
}

$navUserProfile.on("click", navUserProfileClick);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
    console.debug("updateNavOnLogin");
    $(".main-nav-links").show();
    $navLogin.hide();
    $navLogOut.show();
    $navUserProfile.text(`${currentUser.username}`).show();
}
