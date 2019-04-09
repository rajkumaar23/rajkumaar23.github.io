$(document).ready(function(){

    //Adding academic years
    let d = new Date();
    let currentYear = d.getFullYear();
    let years = $("#year");
    years.append('<option value="' + (currentYear - 4) + "_" + (currentYear - 3).toString().substring(2, 4) + '">' + (currentYear - 4) + "_" + (currentYear - 3).toString().substring(2, 4) +  '</option>');
    years.append('<option value="' + (currentYear - 3) + "_" + (currentYear - 2).toString().substring(2, 4) + '">' + (currentYear - 3) + "_" + (currentYear - 2).toString().substring(2, 4) +  '</option>');
    years.append('<option value="' + (currentYear - 2) + "_" + (currentYear - 1).toString().substring(2, 4) + '">' + (currentYear - 2) + "_" + (currentYear - 1).toString().substring(2, 4) +  '</option>');
    years.append('<option value="' + (currentYear - 1) + "_" + (currentYear).toString().substring(2, 4) + '">' + (currentYear - 1) + "_" + (currentYear).toString().substring(2, 4) +  '</option>');
    years.append('<option value="' + (currentYear) + "_" + (currentYear +1).toString().substring(2, 4) + '">' + (currentYear) + "_" + (currentYear+1).toString().substring(2, 4) +  '</option>');
    years.append('<option value="' + (currentYear + 1) + "_" + (currentYear +2).toString().substring(2, 4) + '">' + (currentYear + 1) + "_" + (currentYear+2).toString().substring(2, 4) +  '</option>');

    /*$('#year option').eq(getCookie("year")).prop('selected', true);
    $('#sem option').eq(getCookie("sem")).prop('selected', true);
    $('#batch option').eq(getCookie("batch")).prop('selected', true);
    $('#course option').eq(getCookie("course")).prop('selected', true);
    courseChange($('#course').val());
    $('#branch option').eq(getCookie("branch")).prop('selected', true);*/
    let result = [];
    $.ajax({
        method: 'GET',
        url: "https://intranet.cb.amrita.edu/TimeTable/Faculty/get_staff_list.php?q=a",
        success: (res) => {
            result = res.split('\n');
            fillNames(result);
        }
    });
});

function viewOrDownload() {
    let data = {
        "year": $('#year').val(),
        "Nyear":$('#year').val(),
        "sem":$('#sem').val(),
        "Nsem":$('#sem').val(),
        "NAMEshwbutton": "Show Details",
        "faculty":$('#faculty').val()
    };
    $.ajax({
        method: 'POST',
        dataType:'jsonp',
        url:"https://intranet.cb.amrita.edu/TimeTable/Faculty/index.php",
        data: data,
        success : (res) => {
         console.log(res.findByElement('iframe'));
        }
    });
}

function fillNames(names) {
    let nameSelect =$('#faculty');
    nameSelect.empty();
    for (let i=0 ;i<names.length;++i){
        nameSelect.append($("<option></option>").text(names[i]));
    }
}