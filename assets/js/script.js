var savedDescriptions = [];
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
        saveDescription(event);
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
        if (descriptionEL.children.length > 0) {
            descriptionEL.firstChild.className = "bg-success";
        }
    } else if (moment().isAfter(time)) {
        descriptionEL.parentElement.classList.add("bg-danger");
        if (descriptionEL.children. length > 0) {
            descriptionEL.firstChild.className = "bg-danger";
        }
    } else {
        descriptionEL.parentElement.classList.add("background-light");
        if (descriptionEL.children.length > 0) {
            descriptionEL.firstChild.className = "background-light";
        }
    }
}

function saveDescription(event) {
    var saveBtn = event.target;
    if (event.target.matches(".fa-save")) {
        saveBtn = event.target.parentElement;
    }

    var time = saveBtn.parentElement.querySelector(".hour").textContent;
    var description = saveBtn.parentElement.querySelector(".description").textContent;
    var arrayIndex = exists(time);

    var timeBlock = {
        time: time,
        description: description
    }

    if (arrayIndex < 0) {
        savedDescriptions.push(timeBlock);
    } else {
        savedDescriptions[arrayIndex] = timeBlock;
    }

    localStorage.setItem("descriptions", JSON.stringify(savedDescriptions));
}

function exists(time) {
    var isInArray = -1;
    for (var i = 0; i < savedDescriptions.length; i++) {
        if (time === savedDescriptions[i].time) {
            isInArray = i;
        }
    }
    return isInArray;
}

function loadPage() {
    var savedDescriptions = JSON.parse(localStorage.getItem("descriptions"));
    var descriptions = document.querySelectorAll(".description");
    var timeBlocks = document.querySelectorAll(".hour");

    auditPage();

    if (savedDescriptions) {
        for (var i = 0; i < savedDescriptions.length; i++) {
            for (var j = 0; j < timeBlocks.length; j++) {
                if (timeBlocks[j].textContent === savedDescriptions[i].time) {
                    descriptions[j].textContent = savedDescriptions[i].description;
                }
            }
        }
    }
}

function auditPage() {
    var descriptions = document.querySelectorAll(".description");
    for (var i = 0; i < descriptions.length; i++) {
        auditDescription(descriptions[i]);
    }
}

setInterval(function () {
    auditPage();
}, (1000 * 60) * 60);