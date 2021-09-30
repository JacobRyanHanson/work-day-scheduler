//TODO: Save descriptions to local storage

var date = moment().format('dddd, MMMM Do YYYY');
document.querySelector("#date").textContent = date;

var container = document.querySelector(".container");
container.addEventListener("click", updateHandler);
container.addEventListener("change", updateDescription);

loadPage();

function updateHandler(event) {
    if (event.target.matches(".description")) {
        editDescription(event.target);
    } else if (event.target.matches(".save-btn") || event.target.matches(".fa-save")) {
        saveDescription();
    }
}

function editDescription(descriptionEL) {
    var descriptionText = descriptionEL.textContent;
    var descriptionInput = document.createElement("input");
    descriptionInput.value = descriptionText;
    descriptionEL.textContent = "";
    descriptionEL.appendChild(descriptionInput, descriptionEL);

    auditDescription(descriptionEL);

    descriptionInput.focus();
}

function updateDescription(event) {
    var descriptionInput = event.target;
    var descriptionEl = descriptionInput.parentElement;
    var descriptionText = descriptionInput.value;

    descriptionEl.removeChild(descriptionInput);
    descriptionEl.textContent = descriptionText;
}

function auditDescription(descriptionEL) {
    var timeText = descriptionEL.previousElementSibling.textContent;
    var time = moment(timeText, "h a");

    descriptionEL.parentElement.classList.remove("background-light");
    descriptionEL.parentElement.classList.remove("bg-success");
    descriptionEL.parentElement.classList.remove("bg-danger");

    if (time.format("h a").toUpperCase() === moment().format("h a").toUpperCase()) {
        descriptionEL.parentElement.classList.add("bg-success");
        if (descriptionEL.children) {
            descriptionEL.firstChild.className = "bg-success";
        }
    } else if (moment().isAfter(time)) {
        descriptionEL.parentElement.classList.add("bg-danger");
        if (descriptionEL.children) {
            descriptionEL.firstChild.className = "bg-danger";
        }
    } else {
        descriptionEL.parentElement.classList.add("background-light");
        if (descriptionEL.children) {
            descriptionEL.firstChild.className = "background-light";
        }
    }
}

function saveDescription() {
    console.log("saved")
}

function loadPage() {
    var descriptions = document.querySelectorAll(".description");
    
    for (var i = 0; i < descriptions.length; i++) {
        auditDescription(descriptions[i]);
    }  
}
