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

    $('#year option').eq(getCookie("fac-year")).prop('selected', true);
    $('#sem option').eq(getCookie("fac-sem")).prop('selected', true);
    let result = [];
    $('#faculty').on('input', function() {
        $.ajax({
            method: 'GET',
            url: "https://intranet.cb.amrita.edu/TimeTable/Faculty/get_staff_list.php?q="+$('#faculty').val(),
            success: (res) => {
                result = res.split('\n');
                $("#faculty").typeahead({
                    source: function (request, response) {
                        response(result);
                        $(".dropdown-menu").css("width", "auto");
                        $(".dropdown-menu").css("height", "auto");
                        $(".dropdown-menu").css("font", "15px Varela Round");
                    },
                    hint: true,             // SHOW HINT (DEFAULT IS "true").
                    highlight: true,        // HIGHLIGHT (SET <strong> or <b> BOLD). DEFAULT IS "true".
                    minLength: 1            // MINIMUM 1 CHARACTER TO START WITH.
                });
            }
        });
    });


});

function viewOrDownload() {
    let year = ($('#year').children("option:selected"));
    let sem = ($('#sem').children("option:selected"));

    let data = {
        "year": year.val(),
        "Nyear":year.val(),
        "sem":sem.val(),
        "Nsem":sem.val(),
        "NAMEshwbutton": "Show Details",
        "faculty":$('#faculty').val()
    };
    setCookie("fac-year",year.index());
    setCookie("fac-sem",sem.index());
    $.ajax({
        type: 'POST',
        url:"https://intranet.cb.amrita.edu/TimeTable/Faculty/index.php",
        data: data,
    success : (res) => {
            let url = res.toString().split("<iframe")[1].split("src=\"")[1].split("\"")[0];
        let win = window.open("https://intranet.cb.amrita.edu/TimeTable/Faculty/"+url, '_blank');
        win.focus();
        }
    });
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