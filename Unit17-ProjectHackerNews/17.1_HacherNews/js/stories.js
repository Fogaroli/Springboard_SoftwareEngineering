"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
    // storyList = await StoryList.getStories();
    const storyArray = await StoryList.getStories(0, 8);
    storyList = new StoryList(storyArray);
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
}

/**getMoreStories
 *
 * This function handles the trigger from the page scrool to read more stories from the server
 * Additionally the function compares rendered stories wiht new data to avoid duplicates.
 *
 */
async function getMoreStories() {
    const countOfStories = storyList.stories.length;
    const newStoriesArray = await StoryList.getStories(countOfStories, 3);
    for (const newStory of newStoriesArray) {
        if (
            !storyList.stories.some(
                (story) => story.storyId === newStory.storyId
            )
        ) {
            storyList.stories.push(newStory);
            const $story = generateStoryMarkup(newStory);
            $allStoriesList.append($story);
        }
    }
}

window.addEventListener("scroll", () => {
    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
        getMoreStories();
    }
});

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
    // console.debug("generateStoryMarkup", story);
    let isFavorite = "";
    let deleteIcon = "";
    let editIcon = "";
    if (currentUser) {
        isFavorite = currentUser.checkFavorite(story.storyId)
            ? '<i class="fa-solid fa-star favorite"></i>'
            : '<i class="fa-regular fa-star favorite"></i>';
        editIcon = currentUser.checkOwnStory(story.storyId)
            ? '<i class="fa-solid fa-pencil edit"></i>'
            : "";
        deleteIcon = `<i class="fa-solid fa-trash-can delete"></i>`;
    }
    const hostName = story.getHostName();
    return $(`
      <li id="${story.storyId}">
      <div class="row">
        <div class="icons">
          ${isFavorite}
          ${editIcon}
          ${deleteIcon}
        </div>
        <div class="story-data">
        <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small><br>
        <small class="story-author">by ${story.author}</small><br>
        <small class="story-user">posted by ${story.username}</small>
        </div>
        </div>
        </li>
      <hr>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
    }

    $allStoriesList.show();
}

function putFavoritesOnPage() {
    console.debug("putFavoritesOnPage");
    $allStoriesList.empty();
    if (currentUser.favorites.length === 0) {
        $allStoriesList.prepend(
            $("<div>", { text: "You have not marked any story as favorite" })
        );
    }
    // loop through all of our stories and generate HTML for them
    for (let story of currentUser.favorites) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
    }

    $allStoriesList.show();
}

function putMyStoriesOnPage() {
    console.debug("putMyStoriesOnPage");
    $allStoriesList.empty();
    if (currentUser.ownStories.length === 0) {
        $allStoriesList.prepend(
            $("<div>", { text: "You have not published any story yet" })
        );
    }
    // loop through all of our stories and generate HTML for them
    for (let story of currentUser.ownStories) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
    }

    $allStoriesList.show();
}

/** publishNewStory
 * Function to display new story form and publish it to the API
 * Refreshes the Storylist from the server
 */
async function publishNewStory(evt) {
    console.debug("publishNew Story");
    $("#story-error").remove();
    evt.preventDefault();
    const storyTitle = $("#new-story-title").val();
    const storyURL = $("#new-story-url").val();
    const storyAuthor = $("#new-story-author").val();
    if (storyTitle === "" || storyURL === "" || storyAuthor === "") {
        $newStoryForm.append(
            $("<div>", { text: "All fields are required", id: "story-error" })
        );
    } else {
        const newStory = await StoryList.addStory(currentUser, {
            title: storyTitle,
            author: storyAuthor,
            url: storyURL,
        });
        $newStoryForm.trigger("reset");
        storyList.stories = [newStory, ...storyList.stories];
        currentUser.ownStories = [newStory, ...currentUser.ownStories];
        hidePageComponents();
        putStoriesOnPage();
    }
}

$newStoryForm.on("submit", publishNewStory);

/** Handle click of favorite button
 *
 * Toggle the favorite state of a story
 */
async function deleteStory(evt) {
    console.debug("DelFavorite", evt.target.closest("li").id);
    const storyIdToDelete = evt.target.closest("li").id;
    await StoryList.removeStory(currentUser, storyIdToDelete);
    storyList.stories = storyList.stories.filter(
        (story) => story.storyId !== storyIdToDelete
    );
    currentUser.favorites = currentUser.favorites.filter(
        (story) => story.storyId !== storyIdToDelete
    );
    currentUser.ownStories = currentUser.ownStories.filter(
        (story) => story.storyId !== storyIdToDelete
    );
    $(`#${storyIdToDelete}`).remove();
}

$allStoriesList.on("click", ".delete", deleteStory);

/** editStoryData
 *
 * Funtion to triggered when the edit story button is clicked.
 * Displays the new story form with the target story pre-filled on the fields.
 * Data update is handled by the publishNewStory function
 *
 */
function editStoryData(evt) {
    console.debug("editStoryData", evt.target.closest("li").id);
    const storyIdToEdit = evt.target.closest("li").id;
    const { title, url, author } = storyList.stories.find(
        (story) => story.storyId === storyIdToEdit
    );
    $("#edit-story-title").val(title);
    $("#edit-story-url").val(url);
    $("#edit-story-author").val(author);
    $("#edit-story-id").val(storyIdToEdit);
    $editStoryForm.show();
    $("#edit-story-id").hide();
    putStoriesOnPage();
}

$allStoriesList.on("click", ".edit", editStoryData);

/** publishUpdateStory
 * Function to display new story form and publish it to the API
 * Refreshes the Storylist from the server
 */
async function publishUpdateStory(evt) {
    console.debug("publish updated Story");
    $("#story-error").remove();
    evt.preventDefault();
    const storyTitle = $("#edit-story-title").val();
    const storyURL = $("#edit-story-url").val();
    const storyAuthor = $("#edit-story-author").val();
    const storyIdToEdit = $("#edit-story-id").val();
    if (storyTitle === "" || storyURL === "" || storyAuthor === "") {
        $editStoryForm.append(
            $("<div>", { text: "All fields are required", id: "story-error" })
        );
    } else {
        await StoryList.editStory(currentUser, storyIdToEdit, {
            title: storyTitle,
            author: storyAuthor,
            url: storyURL,
        });

        $editStoryForm.trigger("reset");

        let index = storyList.stories.findIndex(
            (story) => story.storyId === storyIdToEdit
        );
        storyList.stories[index].author = storyAuthor;
        storyList.stories[index].url = storyURL;
        storyList.stories[index].title = storyTitle;
        index = currentUser.ownStories.findIndex(
            (story) => story.storyId === storyIdToEdit
        );
        currentUser.ownStories[index].author = storyAuthor;
        currentUser.ownStories[index].url = storyURL;
        currentUser.ownStories[index].title = storyTitle;
        index = currentUser.favorites.findIndex(
            (story) => story.storyId === storyIdToEdit
        );
        if (index > -1) {
            currentUser.favorites[index].author = storyAuthor;
            currentUser.favorites[index].url = storyURL;
            currentUser.favorites[index].title = storyTitle;
        }
        hidePageComponents();
        putStoriesOnPage();
    }
}

$editStoryForm.on("submit", publishUpdateStory);
