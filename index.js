import fetchPlantResults from './fetchPlantResults'
import createPlantElements from './createPlantElements'

document.addEventListener('DOMContentLoaded', function () {
    const requestParams = {
        sun: '',
        water: '',
        pets: ''
    }

    let form, sunSelect, waterSelect, petsSelect

    //register events
    form = document.getElementsByClassName('main--searchFilters__form')[0]
    form.addEventListener('submit', event => event.preventDefault())

    sunSelect = document.getElementsByClassName('main--searchFilters__form--sun__select')[0]
    waterSelect = document.getElementsByClassName('main--searchFilters__form--water__select')[0]
    petsSelect = document.getElementsByClassName('main--searchFilters__form--pets__select')[0]
    sunSelect.addEventListener('change', event => {
        requestParams.sun = event.target.value
        console.log(requestParams)
        handleSelectChange(requestParams)
    })
    waterSelect.addEventListener('change', event => {
        requestParams.water = event.target.value
        console.log(requestParams)
        handleSelectChange(requestParams)
    })
    petsSelect.addEventListener('change', event => {
        requestParams.pets = event.target.value
        console.log(requestParams)
        handleSelectChange(requestParams)
    })
})

function toggleResults(plantsArray) {
    const noResultsText = document.getElementsByClassName('main--results__noResultText')[0]
    const noResultsIllustration = document.getElementsByClassName('main--results__noResultIllustration')[0]
    const resultsContainer = document.getElementsByClassName('main--results__container')[0]
    if (plantsArray.length) {
        noResultsText.style.display = 'none'
        noResultsIllustration.style.display = 'none'
        resultsContainer.style.display = 'block'
    } else {
        noResultsText.style.display = 'block'
        noResultsIllustration.style.display = 'block'
        resultsContainer.style.display = 'none'
    }
}

function clearPlantElements() {
    const plantsContainer = document.getElementsByClassName('main--results__container--plants')[0]
    plantsContainer.innerHTML = ''
}

async function handleSelectChange(requestParams) {
    const { sun, water, pets } = requestParams
    if (sun && water && pets) {
        const plantsResponse = await fetchPlantResults(requestParams)
        console.log(plantsResponse)
        toggleResults(plantsResponse)
        clearPlantElements()
        createPlantElements(plantsResponse)
    } else {
        clearPlantElements()
        toggleResults([])
    }
}
