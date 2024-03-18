
function randomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

const hello = document.querySelector(`h1`);

// hello.style.color = randomColor();

// setInterval(function(){
//     hello.style.color = randomColor();
// }, 500);

const letters = document.querySelectorAll(`.letter`);

setInterval(function(){
    for (let letter of letters) {
        letter.style.color = randomColor();
        }
    }, 1000);


    // we can set the set interval function to a varialbe and then clear the variable with clearInterval.