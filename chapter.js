const container = document.getElementById('container')

const paramsString = window.location.search
const searchParams = new URLSearchParams(paramsString)
let mangaId = searchParams.get('chapterId')
let chapterId = searchParams.get('id');
let chapterUrl = 'https://api.mangadex.org/at-home/server/' + chapterId

let chapterFetch = await fetch(chapterUrl)
let chapterResult = await chapterFetch.json()

let mangaUrl =    'https://api.mangadex.org/manga/'+ mangaId +'/feed?order[chapter]=asc&limit=500&translatedLanguage[]=en'

let mangaFetch = await fetch(mangaUrl);
let mangaResult = await mangaFetch.json();

console.log(chapterResult)

for(let i = 0; i <= chapterResult.chapter.data.length; i++){
    let chapterImageUrl = 'https://uploads.mangadex.org/data/'+ chapterResult.chapter.hash +'/'+ chapterResult.chapter.data[i]

    container.innerHTML +=
        '<img class="d-block m-auto" src="'+ chapterImageUrl +'" alt="">'
}

let nextChapter

console.log(mangaResult)

for(let i= 0; i <= mangaResult.data.length; i++){
    if (mangaResult.data[i].id === chapterId){
        console.log(mangaResult.data[i])
        nextChapter = mangaResult.data[i + 1].id
        break
    }
}

container.innerHTML +=
    '<a href="chapter.html?id='+ nextChapter +'&chapterId='+ mangaId +'" class="text-decoration-none text-reset d-flex justify-content-end">' +
        '<button>Next</button>'+
    '</a>'