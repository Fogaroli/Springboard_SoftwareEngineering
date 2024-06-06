/*
Title: Giphy Party - AJAX Exercise
Author: Fabricio Ribeiro
Date: April 15, 2024
*/

//Global variables
const submitButton = document.querySelector("#submit");
const deleteInput = document.querySelector("#delete");
const GIFContainer = document.querySelector("#GIFResponse")

//================================================================
//Feature Functions

//Function call when clicking on submit button
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("input");
    processGiphy(searchInput.value);
    searchInput.value = "";
});

//Function call when clicking on delete button
deleteInput.addEventListener("click", (e) => {
    e.preventDefault();
    GIFContainer.innerHTML = "";
});

//function to process the user text input and query the giphy API interface for a related guf image URL.
async function processGiphy(string) {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: { q: string, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" },
    });
    const randomGIF =
        response.data.data[
            Math.floor(Math.random() * response.data.data.length)
        ];
    addGIF(randomGIF.images.original.url);
}

//================================================================
//DOM Manupulation Functions

//Function to add a DIV element to the page with the gif image provided.
function addGIF(gifaddress) {
    const newColumnItem = document.createElement("div");
    newColumnItem.classList.add("col-sm-6", "col-lg-4", "col-xl-3");
    const newGIF = buildImageDIV(gifaddress);
    newColumnItem.appendChild(newGIF);
    GIFContainer.appendChild(newColumnItem);
}

//subfunction to create the IMG element with the fiven gif url.
function buildImageDIV(gifaddress) {
    const GIFElement = document.createElement("img");
    GIFElement.src = gifaddress;
    GIFElement.classList.add("img-fluid", "m-2");
    return GIFElement;
}

//================================================================
