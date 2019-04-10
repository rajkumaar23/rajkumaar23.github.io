let curriculum = $('#curriculum');
function fetchCurriculum() {
    let loading = new Loading({
        title: 'Please wait',
        titleColor: 'rgb(217, 83, 79)',
        discription: 'Loading...',
        discriptionColor: 'rgb(77, 150, 223)',
        animationOriginColor: 'rgb(33, 179, 132)',
        mask: true,
        loadingPadding: '20px 50px',
        defaultApply: true,
    });
    let course = $('#course');

    $.ajax({
        method: 'GET',
        url : 'https://dev.rajkumaar.co.in/utils/btech.php?q='+course.val(),
        success : (res) => {
           console.log(res);
           displayCurriculum(res);
           loading.out();
        }
    });

}

function displayCurriculum(items) {
    curriculum.empty();
    for(let i=0;i<items.length;++i){
        curriculum.append('<br><h3 class="text-white">Semester '+(i+1)+'</h3><br>');
        curriculum.append('<ul class="list-group">');
        for (let j=0;j<items[i].length;++j){
            if(items[i][j]!=="")
            curriculum.append('<li class="list-group-item">'+items[i][j]+'</li>');
        }
        curriculum.append('</ul>');
    }
}

