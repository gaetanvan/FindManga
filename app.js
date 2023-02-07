const container = document.getElementById('container')

if (window.location.search.length < 1) {
const btnSearch = document.getElementById('searchBtn')
btnSearch.addEventListener('click', getManga)
}

async function getManga(){

    if (container.innerHTML.length > 0){
        container.innerHTML = ''
    }

    let mangaUrl

    if (document.getElementById('form1').value.length > 0){
    let title = document.getElementById('form1').value;
        mangaUrl = 'https://api.mangadex.org/manga?title=' + title + '&limit=100&order[followedCount]=desc&contentRating[]=safe';
    }
    else{
        mangaUrl = 'https://api.mangadex.org/manga?limit=100&order[followedCount]=desc&contentRating[]=safe'
    }

    let mangaFetch = await fetch(mangaUrl)
    let mangaResult = await mangaFetch.json();

    for(let i = 0; i <= 11 ; i++){

        let coverId;
    if (mangaResult.data[i].relationships) {
        for (let e = 0; e <= mangaResult.data[i].relationships.length - 1; e++) {
            if (mangaResult.data[i].relationships[e].type === 'cover_art') {
                coverId = mangaResult.data[i].relationships[e].id
                break;
            }
        }
    }
        let coverUrl = 'https://api.mangadex.org/cover/' + coverId;

        let coverFetch = await fetch(coverUrl);
        let resultCover = await coverFetch.json();
        let srcCover = resultCover.data.attributes.fileName

        console.log(mangaResult.data[i])

        let lastChapterUrl = 'https://api.mangadex.org/manga/'+ mangaResult.data[i].id +'/feed?order[chapter]=desc&limit=1'
        let lastChapterFetch = await fetch(lastChapterUrl);
        let lastChapter = await lastChapterFetch.json();
        let lastChapterNumber


        if (lastChapter.data.length > 0) {
            lastChapterNumber = lastChapter.data[0].attributes.chapter
        }
        else {
            lastChapterNumber = 'Inconnu'
        }
        container.innerHTML +=
            '<a href="manga.html?id='+ mangaResult.data[i].id +'" class="col-3 text-decoration-none fw-bold text-reset mt-3">'+
                '<div class="card m-auto homeCard darkblue">' +
                '<img src="https://uploads.mangadex.org/covers/'+ mangaResult.data[i].id +'/'+ srcCover +'" class="card-img-top homeImg" alt="...">' +
                '<div class="card-body row align-items-center">' +
                    '<div class="col">' +
                        '<p class="bold card-text text-center bold">'+ mangaResult.data[i].attributes.title.en +'</p>' +
                        '<p class="card-text text-center">Nombre de chapitre : '+ lastChapterNumber +'</p>' +
                    '</div>' +
                '</div>' +
                '</div>' +
            '</a>'
    }
}
if (window.location.search.length < 1) {
    getManga();
}
else {
    const paramsString = window.location.search
    const searchParams = new URLSearchParams(paramsString)
    let mangaId = searchParams.get('id');
    let mangaUrl = 'https://api.mangadex.org/manga/' + mangaId

    let mangaFetch = await fetch(mangaUrl)
    let mangaResult = await mangaFetch.json()

    console.log(mangaResult)

    let coverId;
    if (mangaResult.data.relationships) {
        for (let e = 0; e <= mangaResult.data.relationships.length - 1; e++) {
            if (mangaResult.data.relationships[e].type === 'cover_art') {
                coverId = mangaResult.data.relationships[e].id
                break;
            }
        }
    }
    let coverUrl = 'https://api.mangadex.org/cover/' + coverId;
    let chapterUrl =    'https://api.mangadex.org/manga/'+ mangaId +'/feed?order[chapter]=asc&limit=500&translatedLanguage[]=en'

    let coverFetch = await fetch(coverUrl);
    let resultCover = await coverFetch.json();
    let srcCover = resultCover.data.attributes.fileName

    let chapterFetch = await fetch(chapterUrl);
    let chapterResult = await chapterFetch.json();

    console.log(chapterResult)


    container.innerHTML += '<div class="row">' +
        '           <div class="col-md-8">' +
        '                <div class="row">' +
        '                    <div class="col-md-12 text-center fw-bold fs-4">' +
                                mangaResult.data.attributes.title.en +
        '                    </div>' +
        '                </div>' +
        '                <div class="row mt-4">' +
        '                    <div class="col-md-12">' +
                                mangaResult.data.attributes.description.en +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="col-md-4">' +
        '                <div class="row">' +
        '                    <div class="col-md-12">' +
        '                        <img src="https://uploads.mangadex.org/covers/'+ mangaResult.data.id +'/'+ srcCover +'" class="card-img-top homeImg" alt="...">' +
        '                    </div>' +
        '                </div>' +
        '                <div class="row">' +
        '                    <div class="col-md-12">' +
        '                        author' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>';

    for (let i = 0; i <= chapterResult.data.length; i++){
        if (i >= 1){
            if (chapterResult.data[i].attributes.chapter === chapterResult.data[i-1].attributes.chapter) {
                continue;
            }
        }
        container.innerHTML +=
        '<a href="chapter.html?id='+ chapterResult.data[i].id +'&chapterId='+ mangaId +'" class="text-decoration-none text-reset">' +
            '<div class="row card m-2">' +
                '<div class="card-body">' +
                    '<div>'+ chapterResult.data[i].attributes.title +'</div>'+
                    '<div>Ch '+ chapterResult.data[i].attributes.chapter +'</div>' +
                '</div>' +
            '</div>' +
        '</a>'
    }
}