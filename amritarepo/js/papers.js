$(document).ready(function(){
    $.ajax({
        method:'GET',
        url:"http://dspace.amritanet.edu:8080/xmlui/handle/123456789/150",
        success: (res) => {
            console.log(res.toString());
        }
    })
});