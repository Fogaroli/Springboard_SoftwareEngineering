/*
Class Notes:

DOM is the object created by the browser when opening an HTML page. This object us used in javascript to search and modify the items in the page.

Selct the items using the methods:

.getElementsByTagName
.getElementById
.querySelector
.querySelectorAll


querySelector is the main method to search object is used CSS selectors as guide to Query items in the html structure.
Once the item is found and saved to a variable, manipulation can be done on the javascript side.


innertext - method toe isolate the text element of an item selected from the HTML page. This bring all the text content, even if it is nested in annother internal element.
    If we replace the content it will replace everythin that is inside, and erase inner elements.
    Gets all text that is displayed in teh browser.

textContent - Similar results, but gets all text contents inclusing what is inside inner elements (inclusing script and style tags)

innerHTML - Get everything that is inside the selected element

style property brings the style that was defined inline (not from a .css file)
    Note that in css we use dashs to define the properties. background-color
    In Javascript we use Camel case: backgroundColor

    Not very useful property because styles are not defined inline. And changing woudl require to do one at a time. (writes inline properties only)

If we select multiple elements, we need to loop though the object with the elements and change one at each time.


__________________________________________________________________________
Atributes

getAttribute(<what we want to read>)
setAttribute(<Attribute> , <Value> ) This replaces the attribute that is already on the item, or it can add an atribute that was not set before.

Some items can be accessed directly
    Exaples are:
    id of an item (and we can overwrite it)
    Value of an input, that is what the user has typed.
_________________________________________
Classes

Most common is to manipulating a class.
We can predefine certain items in CSS in a class, and then we can just move an item from one class to the other with the get/set attibute
We can use .clallName to identify a class name from an object.

.classList creates an array with all the classes given to a certain item and we can play with this array:
    .classList.add / remove / toggle / contains (toggle adds the class if it wasn't already there)


________________________________________
Creating elements

.createElement can be used to add a new elements.
.append will add the creates list as the last child of the item you selected to appended.
.prepend will add as the first child to the parent selected.


______________________________________

Remove contend
.removeChild we need to select the item, then select the parent, and tehn request to remove the item from the parent.

.remove We can just call this method on the item we want to remove.


___________________________________
Relative reference

.parentElement
.children
.firstElementeChild
.firstElementChild
.nextElementSibling
.previousElementSibling


_____________________________
Nodes vs Elements

all elements are nodes, but not all nodes are elements
*/

// const h1 = document.querySelector('h1');
// h1.innerText = "Test from JS"




/*
Event Listeners

All evnts needs: When, where, what
 - Click, on element, run the function

In line script can be written on the HTML, but this is horrible :D.
We can use similar event functions on javascript. We need to identify the object and on javascript we should select the element and set a property (on click) and execute a functions.
The best option is to create an event listener.

For event listener we slect the element and create an event listener with the event we want and the function to be executed (callback)
.addEventListener("click", function());


The callback from an event listener accepts a parameter which is the event itself (target, pageXY, which key)

Prevent Default can be used to filter actions on an html objevt.

Event listener can be added to a parent to cover all the devices under it, then use event.target to figure out where the user has clicked.


Custom information can be added as an attribute to any HTML element. Always use "data-<something>" It does not affect CSS or JS

To read all the attributes we can acces the element "dataset" replies ad DOMStringMAP - all data-something is collected only as something, data- goesaway
    We can access using .target.dataset.<something>







______________________________________________

LocaStorage
    Saves in local browser - all converted to string, Good use for JSON
.setItem()
.getItem()
localStorage.key = value
JSON.stringfy to save the object
JSON.parse to restore to an object

Methods

*/

document.addEventListener("DOMContentLoaded", function(){
// This function is needed to monitor the moment where the script can be executed.
// Not necessarily rendered, but the structure is already in the system

// If we want to wait for rendering we can use an event to
// window.addEventListener("load", function(){




document.querySelector("h1").innerText = "Test 2";

const allPs = document.querySelectorAll(`P`);

// for (let item of allPs){
//     item.style.color = `green`;
//     item.style.fontSize = `30px`;
// }

for (let i=0; i<allPs.length; i++){
    allPs[i].style.fontWeight = `bold`;
}

input = document.querySelector(`input`);
console.log(input.getAttribute(`type`))
console.log(input.getAttribute(`placeholder`))
input.setAttribute("placeholder", "New Placeholder")
console.log(input.getAttribute(`placeholder`))


const todos = document.querySelectorAll("li")

function toggleLines(){
    for (let todo of todos){
        todo.classList.toggle("completed");
    }
}


const button1 = document.querySelector("button");

button1.addEventListener("click", function(){
    button1.style.backgroundColor = "blue"
    console.log("Clicked");
});


const page_body = document.querySelector("body");
const x_scale = 255 / window.innerWidth;
const y_scale = 255 / window.innerHeight;
const g = Math.floor(Math.random() * 256);

document.addEventListener("mousemove", function(position){
    let r = Math.floor(position.pageX * x_scale);
    let b = Math.floor(position.pageY * y_scale);
    let rgb = `rgb(${r},${g},${b})`
    page_body.style.backgroundColor = rgb;
    // console.log(rgb)
});

const form = document.querySelector("form");
const textInput = document.querySelector("input[name='text_to_print']");
form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(textInput.value)
});



});