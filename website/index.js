container = document.getElementById('container');
output_container = document.getElementById('output_container');
generate_button = document.getElementById("generate");
length_slider = document.getElementById("length_slider");

length_span = document.getElementsByTagName('span')[0];
length_span.innerText = length_slider.value;

// password setup
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase_letters = letters.toLowerCase();
var numbers = "1234567890";
var special = "!@#$%^&*";
var all_chars = [];

// fix when no checked boxes!!!
function updateChars(){
    all_chars = [];
    if (document.getElementById("special_check").checked){
        all_chars.push(...special);
    }
    if (document.getElementById("numbers_check").checked){
        all_chars.push(...numbers);
    }
    if (document.getElementById("uppercase_check").checked){
        all_chars.push(...letters);
    }
    if (document.getElementById("lowercase_check").checked){
        all_chars.push(...lowercase_letters);
    }
}

generate_button.addEventListener('click', function(){
    generate_password(length_slider.value);
});

function generate_password(length){
    updateChars();

    var result = '';
    for (let i = 0; i < length; i++){
        let char = Math.floor(Math.random() * all_chars.length);
        result += all_chars[char];
    }
    
    if (length > 20){
        output_container.style.fontSize = "22px";
    }else{
        output_container.style.fontSize = "28px";
    }

    output_container.innerText = result;

    return result;
}

// implement this
function calculate_strength(password){
    if (password.length >= 12){
        console.log('strong');
    }else if(password.length <= 11 && password.length >= 7){
        console.log("moderate");
    }else if(password.length <= 6){
        console.log("weak");
    }
}

length_slider.addEventListener('input', function(){
    generate_password(length_slider.value);
    length_span.innerText = length_slider.value;
});

document.addEventListener("DOMContentLoaded", function(){
    generate_password(length_slider.value);
});

function checkboxListener(event) { 
    const checkboxes = ["special_check", "lowercase_check", "uppercase_check", "numbers_check"]; 
    const checkedCheckboxes = checkboxes.filter(id => document.getElementById(id).checked); 
    if (checkedCheckboxes.length === 0 && event.target.checked === false) { 
        event.target.checked = true; 
    } 
    generate_password(length_slider.value); 
} 
const checkboxes = ["special_check", "lowercase_check", "uppercase_check", "numbers_check"]; 
checkboxes.forEach(id => { 
    const checkbox = document.getElementById(id); 
    checkbox.addEventListener("change", checkboxListener); 
});