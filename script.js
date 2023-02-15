// functions needed to operate

function add(a,b){
    return a+b;
}

function substract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b==0){return "Math-Error";}
    return a/b;
}

function operation(operator,a,b){
    a=Number(a);
    b=Number(b);
    switch(operator){
        case '+' : return add(a,b);
        case '−' : return substract(a,b);
        case '×' : return multiply(a,b);
        case '÷' : return divide(a,b);
        default  : return "Math-Error";
    }
}


//SCRIPT BEGINNING

let a= '';
let b= '';
let operator = null;
let Reset = false;


const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const commaBtn = document.querySelector(".comma");
const screen1 = document.querySelector(".screen_first");
const screen2 = document.querySelector(".screen_second");

window.addEventListener('keydown',keyboard);
equalBtn.addEventListener("click",calculate);
clearBtn.addEventListener("click",clear);
deleteBtn.addEventListener("click",Delete);
commaBtn.addEventListener("click",commarize);

numbers.forEach((button)=>
    button.addEventListener('click',() => displaynum(button.textContent))
);

operators.forEach((button)=>
    button.addEventListener('click',() => Setoperation(button.textContent))
);

// DISPLAY A NUMBER ON THE SCREEN

function displaynum(n){

    if(screen2.textContent.length<15){
        
        if(screen2.textContent === '0' || Reset)
        redisplay();

        screen2.textContent+=n;
    }
}

// TO RESET A SCREEN

function redisplay(){
    screen2.textContent='';
    Reset=false;
}

// FUNCTION TO CLEAR THE CALCULATOR'S DATA

function clear(){
    screen2.textContent = '0'
    screen1.textContent = ''
    a = ''
    b = ''
    operator=null;
}

// WE CAN ALSO WORK WITH REAL NUMBERS

function commarize(){
    if(Reset)redisplay();
    if(screen2.textContent=='')screen2.textContent='0'
    if(screen2.textContent.includes('.'))return
    screen2.textContent+='.'
}

// DELETE FUNCTION

function Delete(){
    screen2.textContent=screen2.textContent.slice(0, -1)
}

// THE MAIN OPERATOR LOGIC + CALCULATOR 

function Setoperation(currentOperator){
    if(operator!=null){
        calculate();
    }
    a=screen2.textContent;
    operator=currentOperator;
    screen1.textContent=`${a} ${operator}`
    Reset=true;
}


function calculate(){
    if(operator==null|| Reset)return
    b=screen2.textContent;
    screen2.textContent=operation(operator,a,b);

    screen1.textContent=`${a} ${operator} ${b} =`
    operator=null;
}

// KEYBOARD PART 

function keyboard(e){
    if(e.key>=0 && e.key<=9) displaynum(e.key)
    if(e.key === '.') commarize()
    if(e.key == '='|| e.key == 'Enter') calculate()
    if(e.key == 'Backspace') Delete();
    if(e.key === '/') Setoperation('÷');
    if(e.key === '*') Setoperation('×');
    if(e.key === '-') Setoperation('−');
    if(e.key === '+') Setoperation('+');
}