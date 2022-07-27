const alert_button = document.getElementById("alert_btn");
const confirm_button = document.getElementById("confirm_btn");
const prompt_button = document.getElementById("prompt_btn");

let output_text = document.getElementById("final_output");

let alert_dialogs = document.getElementById("alert_dialogs");
let confirm_dialogs = document.getElementById("confirm_dialogs");
let prompt_dialogs = document.getElementById("prompt_dialogs");

const cf_ok_button = confirm_dialogs.querySelector('#cf_ok_button')
const cf_cancel_button = confirm_dialogs.querySelector('#cf_cancel_button')

const pt_ok_button = confirm_dialogs.querySelector('#pt_ok_button')
const pt_cancel_button = confirm_dialogs.querySelector('#pt_cancel_button')

alert_button.addEventListener("click", function (){
    output_text.innerText = '';
    alert_dialogs.showModal();
})

confirm_button.addEventListener("click", function (){
    output_text.innerText = '';
    confirm_dialogs.showModal();
    cf_ok_button.addEventListener('click', function (){
        output_text.innerText = 'Confirm result: true';
    })
    cf_cancel_button.addEventListener('click', function (){
        output_text.innerText = 'Confirm result: false';
    })
})

prompt_button.addEventListener("click", function (){
    output_text.innerText = '';
    prompt_dialogs.showModal();

})