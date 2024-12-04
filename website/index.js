container = document.getElementById('container');
output_area = document.getElementById('output_container');
generate_button = document.getElementById("generate");
generate_button.addEventListener('click', function(){
    output = document.createElement('p');
    output.textContent = 'pasword';
    output_area.appendChild(output);
});