
function main(){

    function addLi(){
        const newLi = document.createElement("li")
        const newCheckButton = document.createElement("button")
        const newDeleteButton = document.createElement("button")
        newLi.innerHTML = textInput.value + "&nbsp;&nbsp;"
        newCheckButton.innerHTML = "&#x2713;"
        newCheckButton.id = "check"
        newDeleteButton.innerHTML = "&#x232B;"
        newDeleteButton.id = "delete"
        newLi.appendChild(newCheckButton)
        newLi.appendChild(newDeleteButton)
        return newLi

    }

    const myForm = document.querySelector("form");
    const textInput = document.querySelector("input[id='newTODO'");
    const myList = document.querySelector("ol")
    myList.innerHTML = localStorage.TODOList
    
    myForm.addEventListener("submit", function(event){
        event.preventDefault();
        if (textInput.value){
            myList.appendChild(addLi())
            localStorage.TODOList = myList.innerHTML;
            textInput.value = ""
        }
    })

    myList.addEventListener("click", function(event){
        if (event.target.id === "delete") {
            event.target.parentElement.remove();
            localStorage.TODOList = myList.innerHTML;
        // } else if (event.target.tagName === "LI" ){
        //     event.target.classList.toggle("doneItem");
        //     localStorage.TODOList = myList.innerHTML;
        } else if (event.target.id === "check"){
            event.target.parentElement.classList.toggle("doneItem");
            localStorage.TODOList = myList.innerHTML;
        }

    })
    

}
document.addEventListener("DOMContentLoaded", main);

