document.addEventListener("keyup", (e) => {
    var modal = document.getElementById("modal");
    if (e.code === "Escape") {
        modal.style.display = "none";
        hideMessage(modal);
    }
});

window.onload = function() {
    var form = document.getElementById("modal-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        var f = e.target;
        var url = f.action;
        var data = new FormData(f);
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
        .then( (response) => { 
            showMessage("Данные успешно отправлены", "success-message");
            console.log(response.json());
        },
            (error) => {
                showMessage("Не удалось отправить данные", "error-message");
                console.log(error);
            });
    });
};

function showMessage(text, colorClass) {
    var mes = modal.getElementsByClassName("message")[0];
    mes.style.visibility = "visible";

    mes.classList.remove("error-message");
    mes.classList.remove("success-message");
    mes.classList.add(colorClass);

    mes.innerHTML = text;
}

function hideMessage(modal) {
    var mes = modal.getElementsByClassName("message")[0];
    mes.classList.remove("error-message");
    mes.classList.remove("success-message");
    modal.getElementsByClassName("message")[0].style.visibility = "hidden";
}

function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}