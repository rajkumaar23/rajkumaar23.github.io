$(document).ready(function () {
    if (localStorage.getItem("token") !== null) {
        window.location.href = 'home.html';
    }
    $('#dob').attr("value", getCookie("dob"));
    $('#username').attr("value", getCookie("username"));
});

function verifyOTP(OTP) {
    let loading = new Loading({
        title: 'Please wait',
        titleColor: 'rgb(217, 83, 79)',
        discription: 'Verifying OTP...',
        discriptionColor: 'rgb(77, 150, 223)',
        animationOriginColor: 'rgb(179,139,44)',
        mask: true,
        loadingPadding: '20px 50px',
        defaultApply: true,
    });

    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/authRes/register?rollno=";
    $.ajax({
        method: 'GET',
        url: url + $('#username').val() + "&otp=" + OTP,
        headers: {
            "Authorization": "Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token": "logintoken"
        },
        dataType: 'json',
        success: (res) => {
            if (res.Status === "Y") {
                localStorage.setItem("token", res.Token);
                window.location.href = 'home.html';
            } else {
                swal("Invalid OTP");
            }
            console.log(res);
            loading.out();
        },
        error: (err) => {
            swal("Invalid OTP");
            loading.out();
        }
    });
}
function login() {
    let loading = new Loading({
        title: 'Please wait',
        titleColor: 'rgb(217, 83, 79)',
        discription: 'Loading...',
        discriptionColor: 'rgb(77, 150, 223)',
        animationOriginColor: 'rgb(179,139,44)',
        mask: true,
        loadingPadding: '20px 50px',
        defaultApply: true,
    });
    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/authRes?user_type=Student&rollno=";
    $.ajax({
        method: 'GET',
        url: url + $('#username').val() + "&dob=" + $('#dob').val(),
        headers: {
            "Authorization": "Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token": "logintoken"
        },
        dataType: 'json',
        success: (res) => {
            if (res.Status === "OK") {
                localStorage.setItem("name", res.NAME);
                localStorage.setItem("email", res.Email);
                localStorage.setItem("username", $('#username').val());
                setCookie("username", $('#username').val());
                setCookie("dob", $('#dob').val());
                console.log(localStorage.getItem("name"));
                console.log(localStorage.getItem("email"));
                swal({
                    title: "OTP Verification",
                    text: "Enter the OTP you just received on your number registered in AUMS",
                    icon: "success",
                    content: "input",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    button: {
                        text: "Submit",
                        closeModal: false,
                    },
                }).then(OTP => {
                    verifyOTP(OTP);
                });

            } else {
                swal(res.Status);
            }
            loading.out();
        },
        error: (err) => {
            swal(err.message);
            loading.out();
        }
    });
}

//Sets a cookie on key=>value
function setCookie(key, value) {
    let d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}


//Gets cookie from key
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}