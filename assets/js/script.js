var savedDescriptions = [];
var date = moment().format('dddd, MMMM Do YYYY');
document.querySelector("#date").textContent = date;

var container = document.querySelector(".container");
container.addEventListener("click", updateHandler);
container.addEventListener("change", updateDescription);

loadPage();
// Edits the description or saves the page based on the event.
function updateHandler(event) {
    if (event.target.matches(".description")) {
        editDescription(event.target);
    } else if (event.target.matches(".save-btn") || event.target.matches(".fa-save")) {
        saveDescription(event);
    }
}
// Edits the description by adding an input box to the html element.
function editDescription(descriptionEL) {
    var descriptionText = descriptionEL.textContent;
    var descriptionInput = document.createElement("input");
    descriptionInput.value = descriptionText;
    descriptionEL.textContent = "";
    descriptionEL.appendChild(descriptionInput, descriptionEL);

    auditDescription(descriptionEL);

    descriptionInput.focus();
}
// Updates the html element with the input's text and removes it.
function updateDescription(event) {
    var descriptionInput = event.target;
    var descriptionEl = descriptionInput.parentElement;
    var descriptionText = descriptionInput.value;

    descriptionEl.removeChild(descriptionInput);
    descriptionEl.textContent = descriptionText;
}
// Checks each description (and input) to make sure their background is the right color based on the time.
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
// When the save button is press the description and time are saved as an object to the array.
// Existing time blocks have their descriptions replaced if they already exist.
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
// Checks if the saved element already exists in the array.
function exists(time) {
    var isInArray = -1;
    for (var i = 0; i < savedDescriptions.length; i++) {
        if (time === savedDescriptions[i].time) {
            isInArray = i;
        }
    }
    return isInArray;
}
// Populates each description approperatly given an array of saved descriptions.
function loadPage() {
    savedDescriptions = JSON.parse(localStorage.getItem("descriptions"));
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
// Audits all descriptions on page for correct colors.
function auditPage() {
    var descriptions = document.querySelectorAll(".description");
    for (var i = 0; i < descriptions.length; i++) {
        auditDescription(descriptions[i]);
    }
}
// Audits the page every hour.
setInterval(function () {
    auditPage();
}, (1000 * 60) * 60);