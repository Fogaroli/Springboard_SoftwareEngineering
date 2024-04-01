// Question 1
const section_by_id = document.getElementById("container");
console.dir(section_by_id);

//Question 2
const section_by_id_query = document.querySelector("#container");
console.dir(section_by_id_query);

//Question 3
const class_second = document.getElementsByClassName("second");
console.dir(class_second);

// Question 4
const li_third_from_ol = document.querySelector("ol .third");
console.dir(li_third_from_ol);

// Question 5
section_by_id_query.innerHTML = "Hello!"+section_by_id_query.innerHTML;

// Question 6
const div_footer = document.querySelector(".footer");
div_footer.classList.add("main");
console.dir(div_footer);

// Question 7
div_footer.classList.remove("main");
console.dir(div_footer);

// Question 8
const new_li = document.createElement("li");
console.dir(new_li);

// Question 9
new_li.innerText = "four";

//Question 10
const ul = document.querySelector("ul");
ul.appendChild(new_li);

//Question 11
const ol = document.querySelector("ol");
for (let item of ol.children){
    item.classList.toggle("greeny");
}

//Question 12
div_footer.remove()






/* Answers:

1. Select the section with an id of container without using querySelector.
document.getElementById("container");
​
2. Select the section with an id of container using querySelector.
document.querySelector("#container")
​
3. Select all of the list items with a class of “second”.
document.getElementsByClassName("second")

// OR

document.querySelectorAll(".second")
​
4. Select a list item with a class of third, but only the list item inside of the ol tag.
document.querySelector("ol .third");
​
5. Give the section with an id of container the text “Hello!”.
let foundDiv = document.querySelector("#container");

foundDiv.innerText = "Hello";
​
6. Add the class main to the div with a class of footer.
let footer = document.querySelector(".footer");
footer.classList.add("main");

OR

footer.className += "main";
​
7. Remove the class main on the div with a class of footer.
let footer = document.querySelector(".footer");
footer.classList.remove("main");
​
8. Create a new li element.
let newLi = document.createElement("li");
​
9. Give the li the text “four”.
newLi.innerText = "four"
​
10. Append the li to the ul element.
let list = document.querySelector("ul");
list.appendChild(newLi);
​
11. Loop over all of the lis inside the ol tag and give them a background color of “green”.
let liInsideOl = document.querySelectorAll("ol li");

for(let i = 0; i < liInsideOl.length; i++){
    liInsideOl[i].style.backgroundColor = "green";
}
​
12.Remove the div with a class of footer.
let footer = document.querySelector(".footer");
footer.remove();


*/