$(document).ready(function(){
    //Adding semesters
    for (let i = 1; i <= 10; i++) {
        $('#sem').append('<option value="' + i + '">' + i + '</option>');
    }

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

    $('#year option').eq(getCookie("year")).prop('selected', true);
    $('#sem option').eq(getCookie("sem")).prop('selected', true);
    $('#batch option').eq(getCookie("batch")).prop('selected', true);
    $('#course option').eq(getCookie("course")).prop('selected', true);
    courseChange($('#course').val());
    $('#branch option').eq(getCookie("branch")).prop('selected', true);
});

//For viewing/downloading timetable
function viewOrDownload() {
    let url = 'https://intranet.cb.amrita.edu/TimeTable/PDF/';
    let year = ($('#year').children("option:selected"));
    let course = ($('#course').children("option:selected"));
    let branch  = ($('#branch').children("option:selected"));
    let batch  = ($('#batch').children("option:selected"));
    let sem  = ($('#sem').children("option:selected"));

    url+=year.val()+'/';
    url+=course.val()+'/';
    url+=branch.val()+'/';
    url+=course.val()+branch.val()+batch.val()+sem.val()+'.jpg';

    setCookie("year",year.index());
    setCookie("course",course.index());
    setCookie("branch",branch.index());
    setCookie("sem",sem.index());
    setCookie("batch",batch.index());
    let win = window.open("../view-image.html?src="+url+'&title='+course.val()+branch.val()+batch.val()+sem.val(), '_blank');
    win.focus();
}


//Sets a cookie on key=>value
function setCookie(key,value) {
    let d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}


//Gets cookie from key
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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

//Adding courses
function courseChange(item) {
    let branches = [];
    switch(item){
        case "BTech":
            branches.push("AEE");
            branches.push("CHE");
            branches.push("CIE");
            branches.push("CVI");
            branches.push("CSE");
            branches.push("ECE");
            branches.push("EEE");
            branches.push("EIE");
            branches.push("MEE");
            break;
        case "BA":
            branches.push("MAC");
            branches.push("ENG");
            break;
        case "IMsc":
            branches.push("CHE");
            branches.push("MAT");
            branches.push("PHY");
            break;
        case "MTech":
            branches.push("ATE");
            branches.push("ATL");
            branches.push("BME");
            branches.push("CEN");
            branches.push("CHE");
            branches.push("CIE");
            branches.push("CSE");
            branches.push("CSP");
            branches.push("CVI");
            branches.push("CYS");
            branches.push("EBS");
            branches.push("EDN");
            branches.push("MFG");
            branches.push("MSE");
            branches.push("PWE");
            branches.push("RET");
            branches.push("RSW");
            branches.push("SCE");
            branches.push("VLD");
            break;
        case "MA":
            branches.push("CMN");
            branches.push("MAC");
            branches.push("ENG");
            break;
        case "MBA":
            branches.push("MBA");
            break;
        case "MCA":
            branches.push("MCA");
            break;
        case "MSW":
            branches.push("MSW");
            break;
        case "PGD":
            branches.push("JLM");
            break;
    }
    let branchSelect =$('#branch');
    branchSelect.empty();
    for (let i=0 ;i<branches.length;++i){
        branchSelect.append($("<option></option>").text(branches[i]));
    }
}
