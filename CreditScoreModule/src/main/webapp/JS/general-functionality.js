const navBarItems = 6;

function scrollToTop() {
    window.scrollTo(0, 0);
}

function addEventHandlersToNavBar() {
    for (var i = 1; i <= navBarItems; i++) {
        document.getElementById(`list-0${i}-list`).addEventListener("click", () => scrollToTop());
    }
}

addEventHandlersToNavBar();