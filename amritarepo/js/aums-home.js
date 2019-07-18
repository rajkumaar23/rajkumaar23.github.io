$(document).ready(function () {
    if (localStorage.getItem("token") == null) {
        window.location.href = 'index.html';
    }
    let greeting = $('#greeting');
    greeting.html("Welcome " + localStorage.getItem("name"));
});
