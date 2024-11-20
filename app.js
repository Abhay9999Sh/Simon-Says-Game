let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "red"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector('h2');
let highest = document.querySelector(".score");
let resetBtn = document.querySelector('.reset-btn');

//step 1 =  Start the game on any keypress
document.addEventListener("keypress", function () {  
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

resetBtn.addEventListener("click", function () {  
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function levelUp() {   //Step 2
    userSeq = []; // Reset user sequence for new level
    level++;
    h2.innerText = `Level ${level}` ;

    //random btn choose from btns array
    let randIdx = Math.floor(Math.random() * 4); //0,1,2,3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}


function gameFlash(btn) {  //Step 3 
    btn.classList.add("flash");       //adding class in randBtn 
    setTimeout(function () {          //removing this class after 250 millisec
        btn.classList.remove("flash");     //flash by game random btn press = white
    },300);
}

let allBtns = document.querySelectorAll(".btn");  //step 4
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

                             //step 5
function btnPress() { // event after click the button  
   let btn = this;
   userFlash(btn);        

   userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   
   checkAns(userSeq.length-1);//to check last element in userSeq
}


function userFlash(btn) {    //Step 6
    btn.classList.add("userflash");        //flash by user btn press = green
    setTimeout(function () {
        btn.classList.remove("userflash");
    },300);
}



function checkAns(idx) {   //Step 7
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
           setTimeout(levelUp,1000);
        }
    } else {
        
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "#8eeef8";
        } , 250);     //background becomes white again after 250ms
        highestScore();
        console.log(highScore);
        highest.innerText = `Your highest Score is ${highScore}`;
        reset();   // when wrong key is pressed
    }

}

function highestScore() { //to print the highest score 
    if(highScore < level) {
        highScore = level ;
        return highScore;
    } else {
        return highScore;
    }
}


function reset() {    // Step 8 (last step)
    started = false;
    score = userSeq.length;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

