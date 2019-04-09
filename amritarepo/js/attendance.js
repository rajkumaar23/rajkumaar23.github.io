$(document).ready(function () {
   let token = sessionStorage.getItem("token");
   if(token == null){
       window.location.href = 'login.html';
   }
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

    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/semAtdRes?rollno="+sessionStorage.getItem("username");
    let container = $('#semesters');
    $.ajax({
        method:'GET',
        url:url,
        headers : {
            "Authorization":"Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token":sessionStorage.getItem("token")
        },
        dataType : 'json',
        success : (res) => {
            try{
                for(let i=0;i<res.Semester.length;++i){
                    let current = res.Semester[i];
                    container.append('<li class="list-group-item" value='+current.Id+'>'+"Semester "+current.Semester+' ('+current.Period+')</li>');
                }
                loading.out();
            }catch (e) {
                alert(e.toString());
                sessionStorage.setItem("token",null);
                window.location.href = 'login.html';
            }
        } ,
        error : (err)=>{
            alert(err.toString());
            loading.out();
        }
    });
});