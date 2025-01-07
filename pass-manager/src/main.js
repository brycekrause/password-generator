const { invoke } = window.__TAURI__.core;

let h1 = document.getElementById("h1");

const accountContainer = document.getElementById("accountContainer");
const container = document.getElementById("container");

function new_account(){
    addAccountDiv = document.createElement("div");
    addAccountDiv.className = "addAccountDiv";
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

    linkLabel = document.createElement("label");
    linkLabel.innerText = 'Link:';
    linkInput = document.createElement("input");
    linkInput.placeholder = 'Link';   

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
    addAccountDiv.appendChild(linkLabel);
    addAccountDiv.appendChild(linkInput);
    addAccountDiv.appendChild(loginLabel);
    addAccountDiv.appendChild(loginInput);
    addAccountDiv.appendChild(passwordLabel);
    addAccountDiv.appendChild(passwordInput);


    container.appendChild(addAccountDiv);
}

function appendAccount(title, link, login, password){
    accountDiv = document.createElement("div");

    accountTitle = document.createElement("p");
    accountTitle.innerText = title;
    accountLink = document.createElement("p");
    accountLink.innerText = link;
    accountThumb = document.createElement("img");
    accountThumb.src = "assets/user.png";
    accountLogin = document.createElement("p");
    accountLogin.innerText = login;
    accountPassword = document.createElement("p");
    accountPassword.innerText = password;

    accountDiv.appendChild(accountTitle);
    accountDiv.appendChild(accountLink);
    accountDiv.appendChild(accountThumb);
    accountDiv.appendChild(accountLogin);
    accountDiv.appendChild(accountPassword);

    accountContainer.appendChild(accountDiv);
}

async function save_info(){
    await invoke("append_json", {
      title: titleInput.value, 
      link: linkInput.value,
      login: loginInput.value, 
      password: passwordInput.value
    }).then((response) => {
        h1.textContent = response;
    }).catch((error) => {
        h1.textContent = error;
        console.error("Error: ", error);
    });
    appendAccount(titleInput.value, linkInput.value, loginInput.value, passwordInput.value);
}

document.addEventListener("DOMContentLoaded", function(){
    invoke("read_json").then((response) => {
        for (let i = 0; i < response.length; i++){
            appendAccount(response[i].title, response[i].link, response[i].login, response[i].password);
        }
    }).catch((error) => {
        h1.textContent = error;
        console.error("Error: ", error);
    });

    document.getElementById("new_btn").addEventListener("click", function(){
        addAccountDiv.style.visibility = 'visible';
    });

    closeButton.addEventListener("click", function(){
        addAccountDiv.style.visibility = 'hidden';
    });

    saveButton.addEventListener("click", function(){
        addAccountDiv.style.visibility = 'hidden';
        save_info();
    });

});




new_account();