/* импорт данных */
import { typeOfWorkArr, imgUrls } from "./data.js";

/* Инициализация переменных DOM */
const typeOfWorkEl =  document.getElementById("type-of-work-el")
const mainInformation = document.querySelector('.main-information')

/* Инициализация переменных для динамической смены картинок */
let currentIndex = 0;
const transitionDuration = 1000; /* длительность CSS перехода, мс */
const intervalDuration = 15000; /* время до смены картинки, мс */

/* Функция отрисовки блока с типами работ */
function render() {
    const typeOfWorkBlock = typeOfWorkArr.map(function(work) {
        return `
        <div>
            <h4>${work.title}</h4>
            <p>${work.description}</p>
        </div>
        `
    }).join('')

    typeOfWorkEl.innerHTML = typeOfWorkBlock
}

/* вызов функции отрисовки */
render()


    /* слушатель на всю страницу */
document.addEventListener('click', function(e) {
    /* Нажатие на любую из кнопок "зкакзать..", "Свяжитесь..", "Получить.." */
    if (e.target.id === "order-btn") { 
        e.preventDefault()
        document.getElementById('modal-order').style.display='block'
    }
    /* кнопка закрытие модального окна */
    else if (e.target.id === "close-modal-btn") {
        document.getElementById('modal-order').style.display='none'
    }
    /* копирование почты */
    else if (e.target.id === "copy-email-btn" || e.target.id === "copy-email"){
        copyToClipboard()
    }

})

    /* Функция копирования почты в буфер обмена  */
function copyToClipboard() {
    navigator.clipboard.writeText(document.getElementById('copy-email').innerText)
    document.getElementById("copy-email").style.display = 'none'
    document.getElementById("email-copied").style.display = 'block'
    setTimeout(function(){
        document.getElementById("copy-email").style.display = 'block'
        document.getElementById("email-copied").style.display = 'none'
    }, 3000)
    
}

    /* функция смены картинки в блоке .main-information*/

function changeBackground() {
    /*добавили класс, плавное исчезгновение за счет transition */
    mainInformation.classList.add('fade-out')

    setTimeout(function() {
        currentIndex = (currentIndex + 1) % imgUrls.length
        const newImgUrl = imgUrls[currentIndex]

        mainInformation.style.setProperty('--bg-image', `url(${newImgUrl})`)

        mainInformation.classList.remove('fade-out')
    }, transitionDuration)
}
    /* вызов функции смены картинки в блоке .main-information */
setInterval(changeBackground, intervalDuration)