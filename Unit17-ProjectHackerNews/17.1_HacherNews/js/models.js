"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */
class Story {
    /** Make instance of Story from data object about story:
     *   - {title, author, url, username, storyId, createdAt}
     */
    constructor({ storyId, title, author, url, username, createdAt }) {
        this.storyId = storyId;
        this.title = title;
        this.author = author;
        this.url = url;
        this.username = username;
        this.createdAt = createdAt;
    }

    /** Parses hostname out of URL and returns it. */
    getHostName() {
        // UNIMPLEMENTED: complete this function!
        const storyURL = new URL(this.url);
        return storyURL.hostname;
    }
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */
class StoryList {
    constructor(stories) {
        this.stories = stories;
    }

    /** Generate a story array with response from the server. It:
     *
     *  - calls the API
     *  - builds an array of Story instances
     *  - This function was modifies to return the story array, the calling function should
     * create a new StoryList isntance
     *  - (removed) makes a single StoryList instance out of that
     *  - (removed) returns the StoryList instance.
     */
    static async getStories(start, qty) {
        // Note presence of `static` keyword: this indicates that getStories is
        //  **not** an instance method. Rather, it is a method that is called on the
        //  class directly. Why doesn't it make sense for getStories to be an
        //  instance method?

        // query the /stories endpoint (no auth required)
        const response = await axios({
            url: `${BASE_URL}/stories`,
            method: "GET",
            params: { skip: start, limit: qty },
        });
        // turn plain old story objects from API into instances of Story class and returns the array
        return response.data.stories.map((story) => new Story(story));

        // (removed) build an instance of our own class using the new array of stories
        // (removed) return new StoryList(stories);
    }

    static async get_more_Stories(start, qty) {}

    /** Adds story data to API, makes a Story instance, adds it to story list.
     * - user - the current instance of User who will post the story
     * - obj of {title, author, url}
     *
     * Returns the new Story instance
     */
    static async addStory(user, newStory) {
        //this function should create the story object isntance and post it to the API
        const response = await axios({
            url: `${BASE_URL}/stories`,
            method: "POST",
            data: { token: user.loginToken, story: newStory },
        });

        const { storyId, title, author, url, username, createdAt } =
            response.data.story;

        return new Story({ storyId, title, author, url, username, createdAt });
    }

    /** removeStory
     *
     * This function removes a story from the API Server.
     *
     */
    static async removeStory(user, storyIdToDelete) {
        console.debug("removeStory");
        const response = await axios({
            url: `${BASE_URL}/stories/${storyIdToDelete}`,
            method: "DELETE",
            data: { token: user.loginToken },
        });
        return;
    }

    /**editStory
     * Edit story data on the server using the API.
     * Active user, storyId and object with story details required parameters.
     * story object format:
     * {author, title, url}
     *
     * Returns a story object with updated information.
     */
    static async editStory(user, storyIdToEdit, newStory) {
        console.debug("editStory");
        const response = await axios({
            url: `${BASE_URL}/stories/${storyIdToEdit}`,
            method: "PATCH",
            data: { token: user.loginToken, story: newStory },
        });
        const { storyId, title, author, url, username, createdAt } =
            response.data.story;

        return new Story({ storyId, title, author, url, username, createdAt });
    }
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */
class User {
    /** Make user instance from obj of user data and a token:
     *   - {username, name, createdAt, favorites[], ownStories[]}
     *   - token
     */

    constructor(
        { username, name, createdAt, favorites = [], ownStories = [] },
        token
    ) {
        this.username = username;
        this.name = name;
        this.createdAt = createdAt;

        // instantiate Story instances for the user's favorites and ownStories
        this.favorites = favorites.map((s) => new Story(s));
        this.ownStories = ownStories.map((s) => new Story(s));

        // store the login token on the user so it's easy to find for API calls.
        this.loginToken = token;
    }

    /** checkFavorite.
     * Check if a story is registered as favority.
     * Should return True if story provided is already included in the favorite list.
     */
    checkFavorite(storyIdtocheck) {
        return this.favorites.some((story) => {
            return story.storyId === storyIdtocheck;
        });
    }

    checkOwnStory(storyIdtocheck) {
        return this.ownStories.some((story) => {
            return story.storyId === storyIdtocheck;
        });
    }

    /** toggleFavorite
     *
     * This function adds or removes a story from the users list of favorites.
     *
     * Updates the user favorite array with the API response
     *
     */
    async toggleFavorite(storyIdToToggle) {
        const requestType = this.checkFavorite(storyIdToToggle)
            ? "DELETE"
            : "POST";
        const response = await axios({
            url: `${BASE_URL}/users/${this.username}/favorites/${storyIdToToggle}`,
            method: requestType,
            data: { token: this.loginToken },
        });
        this.favorites = response.data.user.favorites.map((s) => new Story(s));
        return;
    }

    /** updateUser
     *
     * This functions sends an API PATCH request to update user information.
     * Parameter to be updated passed as argument
     */

    async updateUser(data) {
        const response = await axios({
            url: `${BASE_URL}/users/${this.username}`,
            method: "PATCH",
            data: { token: this.loginToken, user: data },
        });
        return { name: response.data.user.name };
    }

    /** updateUser
     *
     * This functions sends an API PATCH request to update user information.
     * Parameter to be updated passed as argument
     */

    async deleteUser() {
        const response = await axios({
            url: `${BASE_URL}/users/${this.username}`,
            method: "DELETE",
            data: { token: this.loginToken },
        });
        return { username: response.data.user.username };
    }

    /** Register new user in API, make User instance & return it.
     *
     * - username: a new username
     * - password: a new password
     * - name: the user's full name
     */

    static async signup(username, password, name) {
        const response = await axios({
            url: `${BASE_URL}/signup`,
            method: "POST",
            data: { user: { username, password, name } },
        }).catch((err) => {
            if (err.response.status === 409) {
                AccountError("Username already taken");
                return err;
            } else {
                AccountError("Error Creating account");
                AccountError(err.message);
                return err;
            }
        });

        if (response instanceof Error) {
            return;
        }

        let { user } = response.data;

        return new User(
            {
                username: user.username,
                name: user.name,
                createdAt: user.createdAt,
                favorites: user.favorites,
                ownStories: user.stories,
            },
            response.data.token
        );
    }

    /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

    static async login(username, password) {
        const response = await axios({
            url: `${BASE_URL}/login`,
            method: "POST",
            data: { user: { username, password } },
        }).catch((err) => {
            if (err.response.status === 401) {
                AccountError("Invalid credentials");
                return err;
            } else {
                AccountError("Error logging in");
                AccountError(err.message);
                return err;
            }
        });
        if (response instanceof Error) {
            return;
        }
        let { user } = response.data;

        return new User(
            {
                username: user.username,
                name: user.name,
                createdAt: user.createdAt,
                favorites: user.favorites,
                ownStories: user.stories,
            },
            response.data.token
        );
    }

    /** When we already have credentials (token & username) for a user,
     *   we can log them in automatically. This function does that.
     */

    static async loginViaStoredCredentials(token, username) {
        try {
            const response = await axios({
                url: `${BASE_URL}/users/${username}`,
                method: "GET",
                params: { token },
            });

            let { user } = response.data;

            return new User(
                {
                    username: user.username,
                    name: user.name,
                    createdAt: user.createdAt,
                    favorites: user.favorites,
                    ownStories: user.stories,
                },
                token
            );
        } catch (err) {
            console.error("loginViaStoredCredentials failed", err);
            return null;
        }
    }
}
