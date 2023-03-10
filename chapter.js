/* Script pour récuperer et afficher les image des chapitre du manga */
const container = document.getElementById('container')
const btn = document.getElementById('btn')

/* On récupere les parametre passer dans l'url pour notre manga */
const paramsString = window.location.search
const searchParams = new URLSearchParams(paramsString)
let mangaId = searchParams.get('chapterId')
let chapterId = searchParams.get('id');
let chapterUrl = 'https://api.mangadex.org/at-home/server/' + chapterId

let chapterFetch = await fetch(chapterUrl)
let chapterResult = await chapterFetch.json()

let mangaUrl = 'https://api.mangadex.org/manga/' + mangaId + '/feed?order[chapter]=asc&limit=500&translatedLanguage[]=en'

let mangaFetch = await fetch(mangaUrl);
let mangaResult = await mangaFetch.json();

console.log(mangaResult)
let a
/* On boucle pour récuperer l'index des chapitre */
for (a = 0; a <= mangaResult.data.length - 1; a++) {
    if (mangaResult.data[a].id === chapterId) {
        a = a
        break;
    }
}

console.log(a)
/* On boucle pour recuperer les pages de notre de chapitre */
for (a = a; a <= mangaResult.data.length - 1; a++) {
    console.log('oui')
    if (a > 0) {
        if (mangaResult.data[a].attributes.chapter === mangaResult.data[a - 1].attributes.chapter) {
            continue;
        } else {
            chapterId = mangaResult.data[a].id
            chapterUrl = 'https://api.mangadex.org/at-home/server/' + chapterId

            chapterFetch = await fetch(chapterUrl)
            chapterResult = await chapterFetch.json()
            break;
        }
    } else {
        continue;
    }
}
/* On boucle pour afficher les pages de notre de chapitre */
console.log(mangaResult.data[2].attributes.chapter)
for (let i = 0; i <= chapterResult.chapter.data.length - 1; i++) {
    let chapterImageUrl = 'https://uploads.mangadex.org/data/' + chapterResult.chapter.hash + '/' + chapterResult.chapter.data[i]

    container.innerHTML +=
        '<img class="d-block m-auto" src="' + chapterImageUrl + '" alt="">'
}

let nextChapter

console.log(mangaResult)
/* On boucle pour éviter les chapitre dupliqué */
for (let i = 0; i <= mangaResult.data.length; i++) {
    if (mangaResult.data[i].id === chapterId) {
        console.log(mangaResult.data[i])
        nextChapter = mangaResult.data[i + 1].id
        break
    }
}
/* On affiche un bouton pour passer au chapitre suivant */
btn.innerHTML +=
    '<a href="chapter.html?id=' + nextChapter + '&chapterId=' + mangaId + '" class="text-decoration-none text-reset d-flex justify-content-end">' +
    '<button>Next</button>' +
    '</a>'