//UI variables
const userInput = document.querySelector(".cardNumInput").firstElementChild;
const cardBtn = document.querySelector(".cardBtn").firstElementChild;
const cardBottom = document.querySelector(".cardBottom");
const userOutput = document.querySelector(".cardOutputCont");
const minGuess = document.querySelector(".minGuess");
const maxGuess = document.querySelector(".maxGuess");

//app variables
const min = 1, 
      max = 10,
      winNum = randNumGen(min,max);
let guessLeft = 3;
let numGuess = 0;
minGuess.innerText = min;
maxGuess.innerText = max;

//event listener
cardBtn.addEventListener("click",checkGuess);
userInput.addEventListener("focus",clrInput);

//event handler
function checkGuess(e){
  e.preventDefault();
  numGuess = Number(userInput.value);
  if(numGuess < min || numGuess > max){
    alert(`enter number between ${min} and ${max}`);
  }
  else{
    console.log("input : ",numGuess);
    switch(numGuess){
      case winNum:
        if(cardBottom.firstElementChild.classList.contains("outputWrong")){
          cardBottom.firstElementChild.classList.remove("outputWrong");
        }
        cardBottom.style.display = "block";
        cardBottom.firstElementChild.classList.add("outputRight");
        cardBottom.firstElementChild.innerText = `${numGuess} is correct`;
        userInput.disabled = "true";
        playAgain();
        break;
      default:
        if(guessLeft === 0){
          if(cardBottom.firstElementChild.classList.contains("outputRight")){
            cardBottom.firstElementChild.classList.remove("outputRight");
          }
          userInput.disabled = "true";
          cardBottom.firstElementChild.classList.add("outputWrong");
          cardBottom.firstElementChild.innerText = `try again, the correct number was "${winNum}"`;
          function hideCardBottom(){
            cardBottom.style.display = "none";
          }
          setTimeout(hideCardBottom,2000);
          playAgain();
          break;
        }
        else{
          if(cardBottom.firstElementChild.classList.contains("outputRight")){
            cardBottom.firstElementChild.classList.remove("outputRight");
          }
          cardBottom.style.display = "block";
          cardBottom.firstElementChild.classList.add("outputWrong");
          guessLeft--;
          console.log("guess left : ",guessLeft);
          cardBottom.firstElementChild.textContent = `${numGuess} is incorrect, guess left = ${guessLeft}`;
          break;
        }
    }
  }
}

function clrInput(e){
  e.target.value = "";
}

function playAgain(){
  cardBtn.value = "play again";
  cardBtn.addEventListener("mousedown",reloadPage)
}

function reloadPage(e){
  window.location.reload();
}

function randNumGen(min,max){
  let ranNum = 0;
  ranNum = Math.floor(Math.random()*(max-min+1)+min);
  return ranNum;
}

console.log(winNum);