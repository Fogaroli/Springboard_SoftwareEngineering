"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
    console.debug("login", evt);
    evt.preventDefault();

    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // User.login retrieves user info from API and returns User instance
    // which we'll make the globally-available, logged-in user.
    currentUser = await User.login(username, password);

    $loginForm.trigger("reset");

    if (!currentUser) {
        return;
    }

    saveUserCredentialsInLocalStorage();
    hidePageComponents();
    putStoriesOnPage();
    updateUIOnUserLogin();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */

async function signup(evt) {
    console.debug("signup", evt);
    evt.preventDefault();

    const name = $("#signup-name").val();
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();

    // User.signup retrieves user info from API and returns User instance
    // which we'll make the globally-available, logged-in user.
    currentUser = await User.signup(username, password, name);
    $signupForm.trigger("reset");

    if (!currentUser) {
        return;
    }
    saveUserCredentialsInLocalStorage();
    hidePageComponents();
    putStoriesOnPage();
    updateUIOnUserLogin();
}

$signupForm.on("submit", signup);

/** Handle click of user name profile edit icon
 *
 * Adds a text input and a submit button to the page
 */

function showUpdateNameInput(evt) {
    console.debug("showUpdateNameInput");
    $("#profile-name-label")
        .append(
            $("<input>", {
                type: "text",
                id: "profile-name",
                autocapitalize: "words",
                value: currentUser.name,
            })
        )
        .append($("<button>", { id: "update-name", text: "Update" }));
    $("#profile-name-label button").on("click", sendUpdateName);
}

$profileForm.on("click", "i", showUpdateNameInput);

/** sendUpdateName
 *
 * Function to update the user name on the server.
 * trigger the fucntion to send an update request to the API.
 * Refreshes form
 */

async function sendUpdateName(evt) {
    evt.preventDefault();
    console.debug("sendUpdateName");
    const name = $("#profile-name").val();
    const updatedUserName = await currentUser.updateUser({ name });
    currentUser.name = updatedUserName.name;
    $("#update-name").remove();
    $("#profile-name").remove();
    navUserProfileClick();
}

/** Handle click of change password button
 *
 * Adds a text input and a submit button to the bottom of the form
 */

function showChangePasswordInput(evt) {
    evt.preventDefault()
    console.debug("showChangePasswordInput");
    $profileForm.append($("<div>", {id:"password-input", class:"profile-input"}))
    $("#password-input").append($("<label>", {for:"profile-password", text:"Enter new password"})).append(
                $("<input>", {
                    type: "password",
                    id: "profile-password",
                    autocomplete: "new-password"
                })
            )
            .append($("<button>", { id: "update-password", text: "Update" }));
    $("#update-password").on("click", "button",  sendUpdatePassword);
}

$("#change-password").on("click", showChangePasswordInput);

/** sendUpdatePassword
 *
 * Function to update the user password on the server.
 * trigger the fucntion to send an update request to the API.
 * Erase password input elements
 */

async function sendUpdatePassword(evt) {
    evt.preventDefault();
    console.debug("sendUpdatePassword");
    const password = $("#profile-password").val();
    const updatedPassword = await currentUser.updateUser({ password });
    $("#password-input").remove();
}


/**sendDeleteUser
 * 
 * Function to delete the user on the server.
 * trigger the fucntion to send an delete request to the API.
 * Logout from the active session
 * 
 */

async function sendDeleteUser(evt){
  evt.preventDefault()
  const response = await currentUser.deleteUser()
  if (response.username = currentUser.username){
    logout();
  } else{
    console.debug("Error deleting user")
  }


}

$("#delete-user").on("click", sendDeleteUser);


/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

function logout(evt) {
    console.debug("logout", evt);
    localStorage.clear();
    location.reload();
}

$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
    console.debug("checkForRememberedUser");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token || !username) return false;

    // try to log in with these credentials (will be null if login failed)
    currentUser = await User.loginViaStoredCredentials(token, username);
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
    console.debug("saveUserCredentialsInLocalStorage");
    if (currentUser) {
        localStorage.setItem("token", currentUser.loginToken);
        localStorage.setItem("username", currentUser.username);
    }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
    console.debug("updateUIOnUserLogin");

    $allStoriesList.show();

    updateNavOnLogin();
}

/**AccountError
 * Show error on account form.
 * Error message provided as argument
 */

function AccountError(err) {
    $signupForm.append($("<div>", { text: err, id: "account-error" }));
}

/** Handle click of favorite button
 *
 * Toggle the favorite state of a story
 */

async function setFavorite(evt) {
    console.debug("SetFavorite", evt.target.closest("li").id);
    const storyIdToFavorite = evt.target.closest("li").id;
    await currentUser.toggleFavorite(storyIdToFavorite);
    evt.target.classList.toggle("fa-solid");
    evt.target.classList.toggle("fa-regular");
}

$allStoriesList.on("click", ".favorite", setFavorite);
