const alert_button = document.getElementById("alert_btn");
const confirm_button = document.getElementById("confirm_btn");
const prompt_button = document.getElementById("prompt_btn");

let output_text = document.getElementById("final_output");
let input_text = document.getElementById("yourName");

let alert_dialogs = document.getElementById("alert_dialogs");
let confirm_dialogs = document.getElementById("confirm_dialogs");
let prompt_dialogs = document.getElementById("prompt_dialogs");

const cf_ok_button = confirm_dialogs.querySelector('#cf_ok_button')
const cf_cancel_button = confirm_dialogs.querySelector('#cf_cancel_button')

const pt_ok_button = prompt_dialogs.querySelector('#pt_ok_button')
const pt_cancel_button = prompt_dialogs.querySelector('#pt_cancel_button')

// If click, the dialog will show up. Clean the output_text each time
alert_button.addEventListener("click", function (){
    output_text.innerText = '';
    alert_dialogs.showModal();
})

// If click, the dialog will show up. Clean the output_text each time
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

// If click, the dialog will show up. Clean the output_text each time
// New Output will be the user input
prompt_button.addEventListener("click", function (){
    output_text.innerText = '';
    prompt_dialogs.showModal();
    input_text.addEventListener('change', function (){
        pt_ok_button.value = input_text.value;
    })
    pt_ok_button.addEventListener('click', function (){
        output_text.innerHTML = 'Prompt result: ' + `${pt_ok_button.value}`;
    })
    pt_cancel_button.addEventListener('click', function (){
        output_text.innerText = `User didn’t` + ` enter anything`;
    })
})