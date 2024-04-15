/*
Title: Fruit Search project - Predictive Text
Author: Fabricio Ribeiro
Date: April 07, 2024
*/

//global variables

const FRUIT = [
    "Apple",
    "Apricot",
    "Avocado 🥑",
    "Banana",
    "Bilberry",
    "Blackberry",
    "Blackcurrant",
    "Blueberry",
    "Boysenberry",
    "Currant",
    "Cherry",
    "Coconut",
    "Cranberry",
    "Cucumber",
    "Custard apple",
    "Damson",
    "Date",
    "Dragonfruit",
    "Durian",
    "Elderberry",
    "Feijoa",
    "Fig",
    "Gooseberry",
    "Grape",
    "Raisin",
    "Grapefruit",
    "Guava",
    "Honeyberry",
    "Huckleberry",
    "Jabuticaba",
    "Jackfruit",
    "Jambul",
    "Juniper berry",
    "Kiwifruit",
    "Kumquat",
    "Lemon",
    "Lime",
    "Loquat",
    "Longan",
    "Lychee",
    "Mango",
    "Mangosteen",
    "Marionberry",
    "Melon",
    "Cantaloupe",
    "Honeydew",
    "Watermelon",
    "Miracle fruit",
    "Mulberry",
    "Nectarine",
    "Nance",
    "Olive",
    "Orange",
    "Clementine",
    "Mandarine",
    "Tangerine",
    "Papaya",
    "Passionfruit",
    "Peach",
    "Pear",
    "Persimmon",
    "Plantain",
    "Plum",
    "Pineapple",
    "Pomegranate",
    "Pomelo",
    "Quince",
    "Raspberry",
    "Salmonberry",
    "Rambutan",
    "Redcurrant",
    "Salak",
    "Satsuma",
    "Soursop",
    "Star fruit",
    "Strawberry",
    "Tamarillo",
    "Tamarind",
    "Yuzu",
];

const suggestionBox = document.querySelector(".suggestions ul");
const textInput = document.querySelector("#fruit")

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//feature functions

//This functon seaches the array of known fruits for a partial string match on any location sof the string.
// This function returns only the 10 first match
function search(str) {
    return FRUIT.filter((fruit) => fruit.toLowerCase().includes(str));
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//DOM manipulation functions

//This functions receives the array with all suggsted fruits to be displayed, and the search string.
//function output is the LI element for each suggestion.
function showSuggestions(results, inputVal) {
    if (results.length !== 0) {
        results.forEach((element) => {
            const boldIndex = element.toLowerCase().indexOf(inputVal);
            const boldElement =
                element.substr(0, boldIndex) +
                "<b>" +
                element.substr(boldIndex, inputVal.length) +
                "</b>" +
                element.substr(boldIndex + inputVal.length);
            addLi(boldElement);
        });
    } else {
        addLi("No Suggestions");
    }
}

//This function adds an LI element in the html with a suggestion result
function addLi(content) {
    const newLi = document.createElement("LI");
    newLi.innerHTML = content;
    suggestionBox.appendChild(newLi);
}

//This functions clears the suggested items from a previous iteraction
function clearSuggestions() {
    suggestionBox.innerHTML = "";
}

//This function is triggered by the keyup event on teh serach input. Reads the string entered by user and pass to the search function:
function searchHandler(e) {
    const searchText = e.target.value.toLowerCase();
    clearSuggestions();
    const suggestionArray = search(searchText);
    showSuggestions(suggestionArray, searchText);
}

//This function is triggered when user clikcs on a suggested item. Item should be used to fill search box
function useSuggestion(e) {
    textInput.value = e.target.closest("LI").textContent;
    clearSuggestions();
}

function previewSuggestion(e) {
    if (e.target.closest("LI")) {
        textInput.value = e.target.closest("LI").textContent;
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Main function called when the page is loaded on the browser
//Add eventlistener to the each box and all child suggestions later populated
function main() {
    textInput.addEventListener("keyup", searchHandler);
    suggestionBox.addEventListener("click", useSuggestion);
    suggestionBox.addEventListener("mouseover", previewSuggestion);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

document.addEventListener("DOMContentLoaded", main);
