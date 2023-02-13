const container = document.getElementById('container')
const searchBar = document.querySelector('.searchBar')

/* Si l'url ne recupere pas d'id (donc si il n'est pas sur une page de description alors l'event peut être jouer*/
if (window.location.search.length < 1) {
    const btnSearch = document.getElementById('searchBtn')
    btnSearch.addEventListener('click', getManga)
    searchBar.addEventListener("keypress", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchBtn').click();
        }
    })
}


/* Recupere et affiche tous les mangas de l'API*/
async function getManga() {

    if (container.innerHTML.length > 0) {
        container.innerHTML = ''
    }

    let mangaUrl
    /* Si la valeur du input de recherche n'est pas vide alors nous changons le titre dans l'url du Fetch sinon on ne lui passe aucun titre*/
    if (document.getElementById('form1').value.length > 0) {
        let title = document.getElementById('form1').value;
        mangaUrl = 'https://api.mangadex.org/manga?title=' + title + '&limit=100&order[followedCount]=desc&contentRating[]=safe';
    } else {
        mangaUrl = 'https://api.mangadex.org/manga?limit=100&order[followedCount]=desc&contentRating[]=safe'
    }

    let mangaFetch = await fetch(mangaUrl)
    let mangaResult = await mangaFetch.json();

    /* boucle pour afficher mes 12 mangas les plus populaire */
    for (let i = 0; i <= 11; i++) {

        /* boucle pour recuperer les covers de mes 12 mangas */
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

        /* recupere le nombre de chapitre sortie en fonction du dernier chapitre afficher dans l'api */
        let lastChapterUrl = 'https://api.mangadex.org/manga/' + mangaResult.data[i].id + '/feed?order[chapter]=desc&limit=1'
        let lastChapterFetch = await fetch(lastChapterUrl);
        let lastChapter = await lastChapterFetch.json();
        let lastChapterNumber

        /* Handler d'erreur si on ne connait pas le dernier chapitre*/
        if (lastChapter.data.length > 0) {
            lastChapterNumber = lastChapter.data[0].attributes.chapter
        } else {
            lastChapterNumber = 'Inconnu'
        }

        /* affichage de tout les élements récuperer */
        container.innerHTML +=
            '<a href="manga.html?id=' + mangaResult.data[i].id + '" class="col-3 text-decoration-none fw-bold text-reset mt-3">' +
            '<div class="card m-auto homeCard darkblue">' +
            '<img src="https://uploads.mangadex.org/covers/' + mangaResult.data[i].id + '/' + srcCover + '" class="card-img-top homeImg" alt="...">' +
            '<div class="card-body row align-items-center">' +
            '<div class="col">' +
            '<p class="bold card-text text-center bold">' + mangaResult.data[i].attributes.title.en + '</p>' +
            '<p class="card-text text-center">Nombre de chapitre : ' + lastChapterNumber + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</a>'
    }
}

/* on verifie si il y a un argument dans l'url si il y a rien on est donc sur la page d'acceuil on appelle donc la fonction getManga  */
if (window.location.search.length < 1) {
    getManga();
}
/* Si il y a un argument dans l'url on est donc dans une page manga précise nous allons donc chercher les informations du manga précisement */
else {
    const paramsString = window.location.search
    const searchParams = new URLSearchParams(paramsString)
    let mangaId = searchParams.get('id');
    let mangaUrl = 'https://api.mangadex.org/manga/' + mangaId

    let mangaFetch = await fetch(mangaUrl)
    let mangaResult = await mangaFetch.json()

    console.log(mangaResult)

    /* On récupere la cover du manga préciser */
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
    let chapterUrl = 'https://api.mangadex.org/manga/' + mangaId + '/feed?order[chapter]=asc&limit=500&translatedLanguage[]=en'

    let coverFetch = await fetch(coverUrl);
    let resultCover = await coverFetch.json();
    let srcCover = resultCover.data.attributes.fileName

    /* On récupere les informations sur les chapitre du manga précis */
    let chapterFetch = await fetch(chapterUrl);
    let chapterResult = await chapterFetch.json();

    console.log(chapterResult)
    console.log(mangaResult)

    /* On affiche les informations du manga précis */
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
        '                        <img src="https://uploads.mangadex.org/covers/' + mangaResult.data.id + '/' + srcCover + '" class="card-img-top homeImg" alt="...">' +
        '                    </div>' +
        '                </div>' +
        '                <div class="row">' +
        '                    <div class="col-md-12">Sortie en' +
        '                          <span>' + mangaResult.data.attributes.year + '</span> ' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>';

    /* On affiche les chapitre en enlevant tout les chapitre dupliquer */
    for (let i = 0; i <= chapterResult.data.length; i++) {
        if (i > 0) {
            if (chapterResult.data[i].attributes.chapter === chapterResult.data[i - 1].attributes.chapter) {
                continue;
            }
        }
        let title = chapterResult.data[i].attributes.title
        if (title === null) {
            title = '';
        }
        container.innerHTML +=
            '<a href="chapter.html?id=' + chapterResult.data[i].id + '&chapterId=' + mangaId + '" target="_blank" class="text-decoration-none text-reset">' +
            '<div class="row card m-2">' +
            '<div class="card-body">' +
            '<div>' + title + '</div>' +
            '<div>Ch ' + chapterResult.data[i].attributes.chapter + '</div>' +
            '</div>' +
            '</div>' +
            '</a>'
    }
}