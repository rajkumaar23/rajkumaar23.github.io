let curriculum = $('#curriculum');
function fetchCurriculum() {
    let course = $('#course');

    $.ajax({
        method: 'GET',
        url : 'https://dev.rajkumaar.co.in/utils/btech.php?q='+course.val(),
        success : (res) => {
           console.log(res);
           displayCurriculum(res);
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
            curriculum.append('<li class="list-group-item list-group-item-dark">'+items[i][j]+'</li>');
        }
        curriculum.append('</ul>');
    }
}

