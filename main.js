// Dom
const screen1 = document.querySelector('.screen_1');
const screen2 = document.querySelector('.screen_2');
const tempoResult = document.querySelector('.tempo-result');
const numbers = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal-sign');
const clear = document.querySelector('.all-clear');

//Переменные, которые нам нужны для двух окошек с вычислениями, результатом, знаком, точкой.
let screen1Num = '';
let screen2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;


numbers.forEach( number => {
    number.addEventListener('click', (e)=>{
      if(e.target.innerText === '.' && !haveDot){
        haveDot = true;
      } else if (e.target.innerText === '.' && haveDot){
        return;
      }
      screen2Num += e.target.innerText;
      screen2.innerText = screen2Num;
    })
  });

  operation.forEach(operation => {
    operation.addEventListener('click', (e)=>{
        if(!screen2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(screen1Num && screen2Num && lastOperation){
            mathOperation()
        }else{
            result = parseFloat(screen2Num); //превращает стринг в намбер
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
});

function clearVar(name = ''){
    screen1Num += screen2Num+ ' ' + name + ' ';
    screen1.innerText = screen1Num;
    screen2.innerText = '';
    screen2Num = '';
    tempoResult.innerText = result;
}

function mathOperation(){
    if(lastOperation === 'x'){
        result = parseFloat(result) * parseFloat(screen2Num);
    }else if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(screen2Num);
    }else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(screen2Num);
    }else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(screen2Num);
    }
}

equal.addEventListener('click', (e)=> {
    if(!screen1Num || !screen2Num) return;
    haveDor = false;
    mathOperation();
    clearVar();
    screen2.innerText = result;
    tempoResult.innerText = '';
    screen2Num = result;
    screen1Num = '';
});

clear.addEventListener('click', (e) => {
    screen1.innerText = '0';
    screen2.innerText = '0';
    screen1Num = '';
    screen2Num = '';
    result = '';
    tempoResult.innerText = '0';
});

//клавиатура

function clickButton(key){
    numbers.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    });
}

function clickOperation(key){
    operation.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    });
}

function clickEqual(){
    equal.click();
}

function clickClear(){
    clear.click();
}


window.addEventListener('keydown', (e) =>{
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ){
        clickButton(e.key);
    }else if(
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/'
    ){
        clickOperation(e.key);
    }else if(e.key === '*'){
        clickOperation('x');
    }else if(e.key === 'Enter'){
        clickEqual('=');
    }else if(e.key === 'Escape'){
        clickClear('C');
    }
});

