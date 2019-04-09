$(document).ready(function () {
    if(sessionStorage.getItem("token") !== null){
        window.location.href = 'home.html';
    }
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
        method:'GET',
        url:url+$('#username').val()+"&otp="+OTP,
        headers : {
            "Authorization":"Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token":"logintoken"
        },
        dataType : 'json',
        success : (res) => {
            if(res.Status === "Y"){
                sessionStorage.setItem("logged-in",true);
                sessionStorage.setItem("token",res.Token);
                alert("SUCCESS "+sessionStorage.getItem("token"));
                window.location.href = 'home.html';
            }else {
                alert(res.Status);
            }
            loading.out();
        } ,
        error : (err)=>{
            alert(err.toString());
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
        method:'GET',
        url:url+$('#username').val()+"&dob="+$('#dob').val(),
        headers : {
          "Authorization":"Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token":"logintoken"
        },
        dataType : 'json',
        success : (res) => {
            if(res.Status === "OK"){
                sessionStorage.setItem("name",res.NAME);
                sessionStorage.setItem("email",res.Email);
                sessionStorage.setItem("username",$('#username').val());
                console.log(sessionStorage.getItem("name"));
                console.log(sessionStorage.getItem("email"));
                let OTP = prompt("Enter the OTP you just received on your number registered in AUMS");
                verifyOTP(OTP);
            }else {
                alert(res.Status);
            }
            loading.out();
           } ,
        error : (err)=>{
           alert(err.toString());
           loading.out();
        }
    });
}