function getManga(){
    let title = document.getElementById('form1').value;
    const baseUrl = 'https://api.mangadex.org';

    (async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: {
                title: title
            }
        });

        console.log(resp.data.data.map(manga => manga.id));
    })();

}