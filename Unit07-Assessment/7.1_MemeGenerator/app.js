/*
Title: Meme generator main JS file
Author:Fabricio Ribeiro
Date: March 28, 2024
*/

//DOM manipulation functions

//function executed when the user submitts the form.
//This function should call other cunftion to build the MEME, then append it to the DOM, then clear the form.
function formSubmit(event) {
    event.preventDefault();
    const imageURL = document.querySelector("input[id='image-input']");
    const upperText = document.querySelector("input[id='upper-text']");
    const bottomText = document.querySelector("input[id='bottom-text']");
    if (imageURL.value !== "") {
        const newMeme = buildMEME(
            imageURL.value,
            upperText.value,
            bottomText.value
        );
        appendDiv(newMeme);
        imageURL.value = "";
        upperText.value = "";
        bottomText.value = "";
    }
}

// Function triggered when the user clicks on the MEME to delete it from the page
function removeMEME(event) {
    event.target.parentElement.parentElement.remove();
}

// Function to append the MEME to the page to the designed space.
function appendDiv(createdMEME) {
    const memeBlock = document.querySelector("#generated-meme");
    const newDIV = document.createElement("div");
    newDIV.append(createdMEME);
    newDIV.classList.add("memeDiv");
    memeBlock.appendChild(newDIV);
}

//Function to create the MEME, should add relevant classes for each object
function buildMEME(url, upperText, bottomText) {
    const backImage = document.createElement("div");
    backImage.style.backgroundImage = `url('${url}')`;
    backImage.classList.add("images");

    const exclude = document.createElement("div");
    exclude.classList.add("exclude");
    exclude.addEventListener("click", removeMEME);

    backImage.appendChild(buildTextBlock(upperText, bottomText));
    backImage.appendChild(exclude);
    return backImage;
}

//Function to build the block with the text content, used in the function to build the MEME
function buildTextBlock(upperText, bottomText) {
    const textBlock = document.createElement("div");
    textBlock.classList.add("text");

    const upper = document.createElement("div");
    upper.innerText = upperText;
    upper.classList.add("uppertext");

    const middle = document.createElement("div");
    middle.classList.add("middle");

    const bottom = document.createElement("div");
    bottom.innerText = bottomText;
    bottom.classList.add("bottomtext");

    textBlock.appendChild(upper);
    textBlock.appendChild(middle);
    textBlock.appendChild(bottom);

    return textBlock;
}

//Main function called when the page is loaded on the browser
function main() {
    const memeForm = document.querySelector("form");
    memeForm.addEventListener("submit", formSubmit);
}

//Runtime Starts

document.addEventListener("DOMContentLoaded", main);
