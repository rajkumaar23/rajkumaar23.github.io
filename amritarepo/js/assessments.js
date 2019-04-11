let texts=[],links=[];
$(document).ready(function () {
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
    let dummy = $('#dummy');
    let assessments = $('#assessments');
    let src = getUrlParameter("url");
    if(src==null || src === "")
        window.location.replace('index.html');

    $.ajax({
        type:'POST',
        url: "https://dev.rajkumaar.co.in/proxy.php",
        data:{
            data : src
        },
        success: (res) => {
            content+=res.toString().split('<body>')[1];
            dummy.append(content);
            texts = [];links = [];
            let ul = (document.querySelector('div#aspect_artifactbrowser_CommunityViewer_div_community-view').getElementsByTagName('ul'));
            let response;
            if (ul.length > 1)
                response = ul.item(1).getElementsByTagName('li');
            else
                response = ul.item(0).getElementsByTagName('li');
            for(let i=0;i<response.length;++i){
                texts.push(response.item(i).innerText);
                links.push('http://dspace.amritanet.edu:8080'+response.item(i).getElementsByTagName("a").item(0).getAttribute("href"));
            }
            content = '<ul class="list-group">';
            for (let i=0;i<texts.length;++i){
                content+='<li class="list-group-item list-group-item-action"  onclick="moveToNextPage('+i+')">'+texts[i]+'</li>'
            }
            content+='</ul>';
            assessments.append(content);
            loading.out();
        },error : (err)=>{
            swal(err.statusText);
            loading.out();
        }
    });
});

function moveToNextPage(link) {
    window.location.href = ('subjects.html?url='+links[link]);
}

let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};