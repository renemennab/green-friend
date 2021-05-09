import { handleSelectChange, scrollToTop } from './utils'

document.addEventListener('DOMContentLoaded', function () {
    const requestParams = {
        sun: '',
        water: '',
        pets: ''
    }

    let form, sunSelect, waterSelect, petsSelect

    form = document.getElementsByClassName('main--searchFilters__form')[0]
    form.addEventListener('submit', event => event.preventDefault())

    const scrollToTopBtn = document.getElementsByClassName('main--results__container--scrollToTopBtn')[0]
    scrollToTopBtn.addEventListener('click', () => scrollToTop())

    sunSelect = document.getElementsByClassName('main--searchFilters__form--sun__select')[0]
    waterSelect = document.getElementsByClassName('main--searchFilters__form--water__select')[0]
    petsSelect = document.getElementsByClassName('main--searchFilters__form--pets__select')[0]
    sunSelect.addEventListener('change', event => {
        requestParams.sun = event.target.value
        handleSelectChange(requestParams)
    })
    waterSelect.addEventListener('change', event => {
        requestParams.water = event.target.value
        handleSelectChange(requestParams)
    })
    petsSelect.addEventListener('change', event => {
        requestParams.pets = event.target.value
        handleSelectChange(requestParams)
    })
})
