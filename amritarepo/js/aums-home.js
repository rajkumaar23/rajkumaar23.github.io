$(document).ready(function () {
    if(sessionStorage.getItem("token")==null){
        window.location.href = 'index.html';
    }
    let greeting = $('#greeting');
    greeting.html("Welcome "+sessionStorage.getItem("name"));
});
