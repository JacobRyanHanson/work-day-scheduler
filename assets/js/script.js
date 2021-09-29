var date = moment().format('dddd, MMMM Do YYYY');
document.querySelector("#date").textContent = date;

var container = document.querySelector(".container");
container.addEventListener("click", updateHandler);

function updateHandler(event) {
    if (event.target.matches(".description")) {
        auditDescription();
    } else if (event.target.matches(".save-btn")) {
        saveDescription();
    }
}

function auditDescription() {
    
}

function saveDescription() {

}

function loadDescription() {

}