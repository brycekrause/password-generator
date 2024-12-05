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



function generate_password(length){

}