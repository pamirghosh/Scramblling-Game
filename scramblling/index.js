const msg = document.querySelector(".msg");
const input = document.querySelector("input");
const btn = document.querySelector(".btn");
const selection = document.querySelectorAll(".btn1");
const score = document.querySelector(".score");
let text = document.querySelector(".text");
const audio = document.querySelector("audio");

let ranWord = ''; 
let cpyRanWord = '';

let flag = 0;

// Differet types of topic array

let fruits = ['apple','mango','banana','pinaple','orange','cherry','peach'];
let animals = ['lion','tiger','deer','elephant','dog','cat','donkey','subhajit','suman','jaguar','beji','haina','wolf','raino','buffelo','giraffe','zebra','fox'];
let country = ['india','pakistan','iran','iraq','bangladesh','russia','china','japan','thailand','combodia','australia','srilanka','bhutan','nepal','mongolia','indonesia','turkey','jordan','lebanon','egypt'];
let state = ['odisha','bihar','meghalaya','manipur','westbengal','uttarpradesh','sikkim','nagaland','tripura','maharastra','karnataka','tamilnadu','kerala','goa'];

// For generating random words

let randomWord = () => {
    if(flag == 1){
        let rand = Math.round(Math.random() * (fruits.length-1));
        return fruits[rand];
    }else if(flag == 2){
        let rand = Math.round(Math.random() * (animals.length-1));
        return animals[rand];
    }else if(flag == 3){
        let rand = Math.round(Math.random() * (country.length-1));
        return country[rand];
    }else{
        let rand = Math.round(Math.random() * (state.length-1));
        return state[rand];
    }
}
// Select a topic and hide the topics and show 'click to start'

for (const selectionbtn of selection) {
    selectionbtn.addEventListener("click",(e)=>{
        if(selectionbtn.innerHTML === 'Fruits'){
            flag = 1;
            for(let i=0;i<selection.length;i++){
                selection[i].classList.toggle("hidden");
                btn.classList.remove("hidden");
            }
        }
        else if(selectionbtn.innerHTML === 'Animals'){
            flag = 2;
            for(let i=0;i<selection.length;i++){
                selection[i].classList.toggle("hidden");
                btn.classList.remove("hidden");
            }
        }
        if(selectionbtn.innerHTML === 'Country'){
            flag = 3;
            for(let i=0;i<selection.length;i++){
                selection[i].classList.toggle("hidden");
                btn.classList.remove("hidden");
            }
        }
        if(selectionbtn.innerHTML === 'States'){
            flag = 4;
            for(let i=0;i<selection.length;i++){
                selection[i].classList.toggle("hidden");
                btn.classList.remove("hidden");
            }
        }
    });
}
// Genarate puzzeled word
let puzzel = (ranWord) => {
    let temp = '';
    for (let i = ranWord.length-1; i > 0; i--) {
        temp = ranWord[i];
        let randIndex = Math.floor(Math.random() * (i+1));
        ranWord[i] = ranWord[randIndex];
        ranWord[randIndex] = temp;
    }
    return ranWord;
}

// Matched the input word with random word
let matchWord = (ranWord) => {
    inputValue = input.value;
    if(ranWord === inputValue){
        return 1;
    }else{
        return 0;
    }
}
let scoreResult = 0;

// Main function for button click
let anyfun = () => {
    if((btn.innerHTML === "Click here to start")||(btn.innerHTML === "next")){
        audio.play();
        btn.innerHTML = "guess";
        input.classList.toggle("hidden");
        score.classList.remove("hidden");
        ranWord = randomWord();
        puzzeleWord = puzzel(ranWord.split('')).join('');
        msg.innerHTML = `Guess the word: <b>${puzzeleWord}</b>`;
    }else{
        let matching =  matchWord(ranWord);
        if(matching){
            msg.innerHTML = `Boom!!! Your word is matched`;
            msg.innerHTML = '';
            swal({
                title: "Good job!",
                text: "Your word is matched!",
                icon: "success",
                button: "OK!",
              });
            scoreResult++;
            text.innerHTML = scoreResult;
            btn.innerHTML = "next";
            input.classList.toggle("hidden");
            input.value = '';
        }else{
            msg.innerHTML = `Wrong answer. Please guess right word: ${puzzeleWord}`;
            // msg.innerHTML = '';
            swal({
                title: "Wrong answer!",
                text:`Please guess right word: ${puzzeleWord}!`,
                icon: "error",
                button: "Try Again!",
              });
            input.value = '';
        }
        
    }

}

btn.addEventListener("click",anyfun);