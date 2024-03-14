function countDown(number){
    for (let i = 1; i <= number; i++){
        if (i == number){
            setTimeout(function(){
                console.log(`"DONE!"`);
            },(number) * 1000);
        } else{
            setTimeout(function(){
                console.log(number -i);
            },(i) * 1000);
        }
    }
}


function randomGame(){
    let counter = 0
    let id = setInterval(function(){
        counter++;
        let random = Math.random();
        // console.log(random)
        if (random > 0.75) {
            clearInterval(id);
            console.log(`Found number after ${counter} attempts`)
            }
    }, 1000) 
}




countDown(4);
randomGame();