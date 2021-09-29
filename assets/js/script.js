//TODO: Make descriptions editable
//TODO: Save descriptions to local storage

var date = moment().format('dddd, MMMM Do YYYY');
document.querySelector("#date").textContent = date;

var container = document.querySelector(".container");
container.addEventListener("click", updateHandler);

loadPage();

function updateHandler(event) {
    if (event.target.matches(".description")) {
        auditDescription(event.target);
    } else if (event.target.matches(".save-btn")) {
        saveDescription();
    }
}

function auditDescription(descriptionEL) {
    var timeText = descriptionEL.previousElementSibling.textContent;
    var time = moment(timeText, "h a");

    descriptionEL.parentElement.classList.remove("background-light");
    descriptionEL.parentElement.classList.remove("bg-success");
    descriptionEL.parentElement.classList.remove("bg-danger");

    if (time.format("h a").toUpperCase() === moment().format("h a").toUpperCase()) {
        descriptionEL.parentElement.classList.add("bg-success");
    } else if (moment().isAfter(time)) {
        descriptionEL.parentElement.classList.add("bg-danger");
    } else {
        descriptionEL.parentElement.classList.add("background-light");
    }
}

function saveDescription() {

}

function loadPage() {
    var descriptions = document.querySelectorAll(".description");
    
    for (var i = 0; i < descriptions.length; i++) {
        auditDescription(descriptions[i]);
    }  
}
