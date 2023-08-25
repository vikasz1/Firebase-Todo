const btn = document.getElementById("add-button")
const inputText = document.getElementById("input-field")
btn.addEventListener('click',(e)=>{
    let inputValue=inputText.value 
    console.log(inputValue);
})