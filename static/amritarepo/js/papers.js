let texts = [], links = [];

function fetchSemesters() {
    let content = "";
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
    let dummy = $('#dummy');
    let sem = $('#semesters');

    $.ajax({
        type: 'POST',
        url: "https://dev.rajkumaar.co.in/proxy.php",
        data: {
            data: 'http://dspace.amritanet.edu:8080/xmlui/handle/123456789/' + course.val()
        },
        success: (res) => {
            loading.out();
            content += res.toString().split('<body>')[1];
            dummy.append(content);
            texts = [];
            links = [];
            let response = (document.querySelector('div#aspect_artifactbrowser_CommunityViewer_div_community-view').getElementsByTagName('ul').item(0).getElementsByTagName('li'));
            for (let i = 0; i < response.length; ++i) {
                texts.push(response.item(i).innerText);
                links.push('http://dspace.amritanet.edu:8080' + response.item(i).getElementsByTagName("a").item(0).getAttribute("href"));
            }
            content = '<br><h3 class="text-white">Semesters</h3><ul class="list-group">';
            for (let i = 0; i < texts.length; ++i) {
                content += '<li class="list-group-item list-group-item-action"  onclick="moveToNextPage(' + i + ')">' + texts[i] + '</li>'
            }
            content += '</ul>';
            sem.append(content);
        }, error: (err) => {
            swal(err.statusText);
            loading.out();
        }
    });
}

function moveToNextPage(link) {
    window.location.href = ('assessments.html?url=' + links[link]);
}
