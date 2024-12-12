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

for (let i = 0; i < letters.length; i++){
    all_chars.push(letters[i]);
}
for (let i = 0; i < lowercase_letters.length; i++){
    all_chars.push(lowercase_letters[i]);
}
for (let i = 0; i < numbers.length; i++){
    all_chars.push(numbers[i]);
}
for (let i = 0; i < special.length; i++){
    all_chars.push(special[i]);
}

generate_button.addEventListener('click', function(){
    generate_password(length_slider.value);
});

function generate_password(length){
    var result = '';
    for (let i = 0; i < length; i++){
        let char = Math.floor(Math.random() * all_chars.length);
        result += all_chars[char];
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

document.getElementById("special_check").addEventListener("change", function(){
    if (special_check.checked){
        console.log("checked");
    }else{
        console.log("unchecked");
    }
});

document.getElementById("characters_check").addEventListener("change", function(){
    if (special_check.checked){
        console.log("checked");
    }else{
        console.log("unchecked");
    }
});

document.getElementById("numbers_check").addEventListener("change", function(){
    if (special_check.checked){
        console.log("checked");
    }else{
        console.log("unchecked");
    }
});