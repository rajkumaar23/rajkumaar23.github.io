$(document).ready(function () {
    let token = localStorage.getItem("token");
    if (token == null) {
        window.location.href = 'index.html';
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

    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/semAtdRes?rollno=" + localStorage.getItem("username");
    let container = $('#semesters');
    if (localStorage.getItem("sem-for-atd") == null) {

        $.ajax({
            method: 'GET',
            url: url,
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token": localStorage.getItem("token")
            },
            dataType: 'json',
            success: (res) => {
                try {
                    localStorage.setItem("sem-for-atd", JSON.stringify(res));
                    for (let i = 0; i < res.Semester.length; ++i) {
                        let current = res.Semester[i];
                        container.append('<li class="list-group-item list-group-item-action" onclick="attendance(this.value)" value=' + current.Id + '>' + "Semester " + current.Semester + '</li>');
                    }
                    loading.out();
                    localStorage.setItem("token", res.Token);
                } catch (e) {
                    alert(e.message);
                }
            },
            error: (err) => {
                alert(err.message);
                loading.out();
            }
        });
    } else {
        try {
            res = JSON.parse(localStorage.getItem("sem-for-atd"));
            for (let i = 0; i < res.Semester.length; ++i) {
                let current = res.Semester[i];
                container.append('<li class="list-group-item list-group-item-action" onclick="attendance(this.value)" value=' + current.Id + '>' + "Semester " + current.Semester + '</li>');
            }
            loading.out();
        } catch (e) {
            alert(e.message);
        }
    }
});

function attendance(sem) {
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
    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/attRes?rollno=" + localStorage.getItem("username") + "&sem=" + sem;
    let container = $('#semesters');
    $.ajax({
        method: 'GET',
        url: url,
        headers: {
            "Authorization": "Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token": localStorage.getItem("token")
        },
        dataType: 'json',
        success: (res) => {
            try {
                container.empty();
                for (let i = 0; i < res.Values.length; ++i) {
                    let current = res.Values[i];
                    container.append('<li class="list-group-item list-group-item-action">'
                        + current.CourseName + ' <span style="color: #ff0000;">( ' + current.TotalPercentage + '% )</span><br><span style="color: #108100;">' + 'You attended ' + current.ClassPresent + ' out of ' + current.ClassTotal + '</span></li>');
                }
                $("#title").html("Your Attendance");
                localStorage.setItem("token", res.Token);
                loading.out();
            } catch (e) {
                alert(e.toString());
                localStorage.setItem("token", null);
                window.location.href = 'index.html';
            }
        },
        error: (err) => {
            alert(err.message);
            loading.out();
        }
    });
}
