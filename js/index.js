const ERROR_MESSAGE_CLASS = "error-message";
const SUCCESS_MESSAGE_CLASS = "success-message";

const ERROR_MESSAGE_STRING = "Не удалось отправить данные";
const SUCCESS_MESSAGE_STRING = "Данные успешно отправлены";

window.onload = function() {
    var form = document.getElementById("modal-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendData(e.target);
    });
};

document.addEventListener("keyup", (e) => {
    var modal = document.getElementById("modal");
    if (e.code === "Escape") {
        modal.style.display = "none";
        hideMessage(modal);
    }
});

function sendData(targetForm) {
    var url = targetForm.action;
    var data = new FormData(targetForm);
    var dict = {};

    for (const [name,value] of data) {
        dict[name] = value;
    }
    console.log(dict);

    fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dict)
    })
    .then(
        (response) => { 
            showMessage(SUCCESS_MESSAGE_STRING, SUCCESS_MESSAGE_CLASS);
            console.log(response.json());
        },
        (error) => {
                showMessage(ERROR_MESSAGE_STRING, ERROR_MESSAGE_CLASS);
                console.log(error);
        }
    );    
}

function getMessage(modal) {
    return modal.getElementsByClassName("message")[0];
}

function showMessage(text, colorClass) {
    var modal = document.getElementById("modal");
    var mes = getMessage(modal);
    mes.style.visibility = "visible";

    resetMessageStyle(mes);
    mes.classList.add(colorClass);
    mes.innerHTML = text;
}

function hideMessage(modal) {
    var mes = getMessage(modal);
    resetMessageStyle(mes);
    mes.style.visibility = "hidden";
}

function resetMessageStyle(message) {
    message.classList.remove(ERROR_MESSAGE_CLASS);
    message.classList.remove(SUCCESS_MESSAGE_CLASS);
}

function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}