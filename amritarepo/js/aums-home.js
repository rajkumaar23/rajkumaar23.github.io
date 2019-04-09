$(document).ready(function () {
    if(sessionStorage.getItem("token")==null){
        window.location.href = 'login.html';
    }
    let greeting = $('#greeting');
    greeting.html(sessionStorage.getItem("name"));
});
