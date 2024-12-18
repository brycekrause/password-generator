const accountContainer = document.getElementById("accountContainer");


function new_account(){
    addAccountDiv = document.createElement("div");
    addAccountDiv.style.visibility = 'hidden';

    headerDiv = document.createElement("div");

    windowTitle = document.createElement("h1");
    windowTitle.innerText = "Add account";

    buttonDiv = document.createElement("div");

    saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.className = "saveButton";
    closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.className = "closeButton";

    buttonDiv.appendChild(saveButton);
    buttonDiv.appendChild(closeButton);

    headerDiv.appendChild(windowTitle);
    headerDiv.appendChild(buttonDiv);

    titleLabel = document.createElement("label");
    titleLabel.innerText = 'Title:';
    titleInput = document.createElement("input");
    titleInput.placeholder = 'Name of service';

    loginLabel = document.createElement("label");
    loginLabel.innerText = 'Login:';
    loginInput = document.createElement("input");
    loginInput.placeholder = 'Username/Email';

    passwordLabel = document.createElement("label");
    passwordLabel.innerText = 'Password:';
    passwordInput = document.createElement("input");
    passwordInput.placeholder = 'Password';   

    addAccountDiv.appendChild(headerDiv);
    addAccountDiv.appendChild(titleLabel);
    addAccountDiv.appendChild(titleInput);
    addAccountDiv.appendChild(loginLabel);
    addAccountDiv.appendChild(loginInput);
    addAccountDiv.appendChild(passwordLabel);
    addAccountDiv.appendChild(passwordInput);


    accountContainer.appendChild(addAccountDiv);
}


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("new_btn").addEventListener("click", function(){
        addAccountDiv.style.visibility = 'visible';
    });

    closeButton.addEventListener("click", function(){
        addAccountDiv.style.visibility = 'hidden';
    });

    saveButton.addEventListener("click", function(){
        addAccountDiv.style.visibility = 'hidden';
    });

});




new_account();