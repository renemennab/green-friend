import { handleSelectChange, scrollToTop } from './js/utils'

document.addEventListener('DOMContentLoaded', function () {
    const requestParams = {
        sun: '',
        water: '',
        pets: ''
    }

    let form = document.getElementsByClassName('main--searchFilters__form')[0]
    form.addEventListener('submit', event => event.preventDefault())

    const scrollToTopBtn = document.getElementsByClassName('main--results__container--scrollToTopBtn')[0]
    scrollToTopBtn.addEventListener('click', () => scrollToTop())

    const elementsArray = Object.keys(requestParams)
    elementsArray.forEach(element => {
        const node = document.getElementsByClassName(`main--searchFilters__form--${element}__select`)[0]

        node.addEventListener('change', event => {
            requestParams[element] = event.target.value
            handleSelectChange(requestParams)
        })
    })
})
