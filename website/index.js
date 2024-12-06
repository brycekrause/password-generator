container = document.getElementById('container');
output_area = document.getElementById('output_container');
generate_button = document.getElementById("generate");
generate_button.addEventListener('click', function(){
    output = document.createElement('p');
    output.textContent = 'pasword';
    output_area.appendChild(output);
});


let length = 0;

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



function generate_password(length){
    let result = '';
    for (let i = 0; i < length; i++){
        let char = Math.floor(Math.random() * all_chars.length+1);
        result += all_chars[char];
    }
    console.log(result);
}

//generate_password(12);