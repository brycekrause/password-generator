/* TODO: organize
         save button
         animations
         MAKE BETTER!

container = document.getElementById('container');
output_container = document.getElementById('output_container');
generate_button = document.getElementById("generate");
length_slider = document.getElementById("length_slider");

length_span = document.getElementsByTagName('span')[0];
length_span.innerText = length_slider.value;

strength_label = document.getElementById("strength");

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
    
    if (length >= 20){
        output_container.style.fontSize = "22px";
    }else{
        output_container.style.fontSize = "28px";
    }

    output_container.innerText = result;
    strength_label.innerText = calculate_strength(result);

    return result;
}

function calculate_strength(password){
    let strength = ''
    if (password.length >= 20){
        strength = 'Excellent';
        strength_label.style.color = "royalblue"
    }else if (password.length <= 19 && password.length >= 12){
        strength = 'Strong';
        strength_label.style.color = "lightgreen";
    }else if(password.length <= 11 && password.length >= 7){
        strength = 'Moderate'
        strength_label.style.color = "yellow";
    }else if(password.length <= 6){
        strength = 'Weak'
        strength_label.style.color = "red";
    }

    return strength;
}

length_slider.addEventListener('input', function(){
    generate_password(length_slider.value);
    length_span.innerText = length_slider.value;
});

document.addEventListener("DOMContentLoaded", function(){
    generate_password(length_slider.value);
});

// check for checked checkboxes. Ensure one checkbox is ALWAYS checked
function checkboxListener(event) {  
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