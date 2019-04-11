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
    let subjects = $('#subjects');
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
            let ul = (document.querySelector('div#aspect_discovery_CollectionRecentSubmissions_div_collection-recent-submission').getElementsByTagName('ul'));
            let response;
            if (ul.length > 1)
                response = ul.item(1).getElementsByTagName('li');
            else
                response = ul.item(0).getElementsByTagName('li');
            let nextUrl = 'http://dspace.amritanet.edu:8080'+response.item(0).getElementsByTagName("a").item(0).getAttribute("href");
            $.ajax({
                type:'POST',
                url: "https://dev.rajkumaar.co.in/proxy.php",
                data:{
                    data : nextUrl
                },
                success: (res) => {
                    content+=res.toString().split('<body>')[1];
                    dummy.append(content);
                    texts = [];links = [];
                    let items = document.querySelector('div.file-list').children;
                    for(let i=0;i<items.length;++i){
                        texts.push(items[i].getElementsByClassName("file-metadata").item(0).getElementsByTagName("span").item(1).getAttribute("title"));
                        links.push(items[i].getElementsByTagName("a").item(0).getAttribute("href"));
                    }
                    content = '<ul class="list-group">';
                    for (let i=0;i<texts.length;++i){
                        content+='<li class="list-group-item list-group-item-action"  onclick="moveToNextPage('+i+')">'+texts[i]+'</li>'
                    }
                    content+='</ul>';
                    subjects.append(content);
                    loading.out();
                },error : (err)=>{
                    swal(err.statusText);
                    loading.out();
                }
            });
        },error : (err)=>{
            swal(err.statusText);
            loading.out();
        }
    });
});

function moveToNextPage(link) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://dev.rajkumaar.co.in/proxy.php",true);
    xhr.responseType = "blob";
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            let blob = xhr.response;
            console.log(blob.size);
            let link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=new Date().toUTCString()+".pdf";
            link.click();
        }
    };
    xhr.send("data=http://dspace.amritanet.edu:8080"+links[link]);
    /*let win = window.open('http://dspace.amritanet.edu:8080'+links[link], '_blank');
    win.focus();*/
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