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

    loginLabel = document.createElement("label");
    loginLabel.innerText = 'Login:';
    loginInput = document.createElement("input");
    loginInput.placeholder = 'Username/Email';

    passwordLabel = document.createElement("label");
    passwordLabel.innerText = 'Password:';
    passwordInput = document.createElement("input");
    passwordInput.placeholder = 'Password';   

    noteLabel = document.createElement("label");
    noteLabel.innerText = 'Note:';
    noteInput = document.createElement("input");
    noteInput.placeholder = 'Additional information';

    addAccountDiv.appendChild(headerDiv);
    addAccountDiv.appendChild(titleLabel);
    addAccountDiv.appendChild(titleInput);
    addAccountDiv.appendChild(loginLabel);
    addAccountDiv.appendChild(loginInput);
    addAccountDiv.appendChild(passwordLabel);
    addAccountDiv.appendChild(passwordInput);
    addAccountDiv.appendChild(noteLabel);
    addAccountDiv.appendChild(noteInput);

    closeButton.addEventListener("click", function(){
        addAccountDiv.style.visibility = 'hidden';
        titleInput.value = '';
        loginInput.value = '';
        passwordInput.value = '';
        noteInput.value = '';
    });

    saveButton.addEventListener("click", function(){
        addAccountDiv.style.visibility = 'hidden';
        save_info();
    });

    container.appendChild(addAccountDiv);
}

function account_info(){
    infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";
    infoDiv.style.visibility = 'hidden';
    
    infoHeader = document.createElement("div");

    infoTitle = document.createElement("h1");
    infoTitle.innerText = "Account Information";

    infoLogin = document.createElement("p");
    infoLogin.innerText = "Login: ";
    infoLoginValue = document.createElement("p");
    infoLoginValue.innerText = "";

    infoPassword = document.createElement("p");
    infoPassword.innerText = "Password: ";
    infoPasswordValue = document.createElement("p");
    infoPasswordValue.innerText = "";

    infoNote = document.createElement("p");
    infoNote.innerText = "Note: ";
    infoNoteValue = document.createElement("p");
    infoNoteValue.innerText = "";

    info_edit_button = document.createElement("button");
    info_edit_button.innerText = "Edit";

    info_close_button = document.createElement("button");
    info_close_button.innerText = "Close";

    infoHeader.appendChild(infoTitle);
    infoHeader.appendChild(info_edit_button);
    infoHeader.appendChild(info_close_button);

    infoDiv.appendChild(infoHeader);
    infoDiv.appendChild(infoLogin);
    infoDiv.appendChild(infoLoginValue);
    infoDiv.appendChild(infoPassword);
    infoDiv.appendChild(infoPasswordValue);
    infoDiv.appendChild(infoNote);
    infoDiv.appendChild(infoNoteValue);

    info_edit_button.addEventListener("click", function(){
        console.log("Edit button clicked");
    });

    info_close_button.addEventListener("click", function(){
        infoDiv.style.visibility = 'hidden';
    });

    container.appendChild(infoDiv);
}

function appendAccount(title, login, password, note){
    accountDiv = document.createElement("div");
    accountDiv.id = "accountDiv";

    accountThumb = document.createElement("img");
    accountThumb.src = "assets/user.png";    
    accountTitle = document.createElement("p");
    accountTitle.innerText = title;

    accountDiv.appendChild(accountThumb);
    accountDiv.appendChild(accountTitle);

    accountDiv.addEventListener("click", function(){
        if (infoDiv.style.visibility == 'visible'){
            infoDiv.style.visibility = 'hidden';
        }
        
        infoTitle.innerText = title;
        infoLoginValue.innerText = login;
        infoPasswordValue.innerText = password;
        infoNoteValue.innerText = note;
        infoDiv.style.visibility = 'visible';
    });

    accountContainer.appendChild(accountDiv);
}

async function save_info(){
    await invoke("append_json", {
      title: titleInput.value, 
      login: loginInput.value, 
      password: passwordInput.value,
      note: noteInput.value
    }).catch((error) => {
        h1.textContent = error;
        console.error("Error: ", error);
    });
    appendAccount(titleInput.value, loginInput.value, passwordInput.value, noteInput.value);

    titleInput.value = '';
    loginInput.value = '';
    passwordInput.value = '';
    noteInput.value = '';
}

document.addEventListener("DOMContentLoaded", function(){
    invoke("read_json").then((response) => {
        for (let i = 0; i < response.length; i++){
            appendAccount(response[i].title, response[i].login, response[i].password, response[i].note);
        }
    }).catch((error) => {
        h1.textContent = error;
        console.error("Error: ", error);
    });

    document.getElementById("new_btn").addEventListener("click", function(){
        if (infoDiv.style.visibility == 'visible'){
            infoDiv.style.visibility = 'hidden';
        }
        addAccountDiv.style.visibility = 'visible';
    });
});




new_account();
account_info();