const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}
func()

const NOTIFICATION_TITLE = 'FindManga'
const NOTIFICATION_BODY = 'Vos mangas favoris en libre accés !'
const CLICK_MESSAGE = 'Merci de votre soutien !'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE