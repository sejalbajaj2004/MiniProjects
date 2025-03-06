let display = document.getElementById('display');
function addsymbol(input){
    display.value = display.value + input;
}

function calculate(){
    try{let res = eval(display.value);
    display.value = res;
    }
    catch{
        display.value="Error";
    }
}

function cleardisplay(){
    display.value ="";
}

function clearinput(){
    let str = display.value;
    let newstr = str.slice(0,str.length-1);
    display.value=newstr;
}


// let display = document.getElementById('display');
// function addsymbol(input) {
//     display.value = display.value + input;
// }
// function calculate() {
//     try{
//         let res = eval(display.value);
//     display.value = res;
// }
//     catch(error){
//         display.value="Error";
//     }
// }
// function cleardisplay() {
//     display.value = "";
// }
// function clearinput() {
//     let st=display.value;
//     let newstr=st.slice(0,st.length-1)
//     display.value = newstr;
// }
