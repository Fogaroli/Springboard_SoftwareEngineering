/*
Title: 
Author: 
Date: 
*/

//Global variables
const submitButton = document.querySelector("#submit");
const deleteInput = document.querySelector("#delete");
const GIFContainer = document.querySelector("#GIFResponse")

//================================================================
//Feature Functions

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("input");
    processGiphy(searchInput.value);
    searchInput.value = "";
});

deleteInput.addEventListener("click", (e) => {
    e.preventDefault();
    GIFContainer.innerHTML = "";
});

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

function addGIF(gifaddress) {
    const newColumnItem = document.createElement("div");
    newColumnItem.classList.add("col-sm-6", "col-lg-4", "col-xl-3");
    const newGIF = buildImageDIV(gifaddress);
    newColumnItem.appendChild(newGIF);
    GIFContainer.appendChild(newColumnItem);
}

function buildImageDIV(gifaddress) {
    const GIFElement = document.createElement("img");
    GIFElement.src = gifaddress;
    GIFElement.classList.add("img-fluid", "m-2");
    return GIFElement;
}

//================================================================
