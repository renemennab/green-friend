import createPlantElements from './createPlantElements'
import plantSlider from './plantSlider'

export function isMobile() {
    return window.innerWidth < 600
}

export function scrollToTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
}

function removePlantsContainerElements() {
    const plantsContainer = document.getElementsByClassName('main--results__container--plants__wrapper--slides')[0]
    plantsContainer.innerHTML = ''
}

export async function handleSelectChange(requestParams) {
    const { sun, water, pets } = requestParams
    if (sun && water && pets) {
        const plantsResponse = await fetchPlantResults(requestParams)
        toggleResults(plantsResponse)
        removePlantsContainerElements()
        createPlantElements(plantsResponse)
        const slider = document.getElementsByClassName('main--results__container--plants')[0],
            sliderItems = document.getElementsByClassName('main--results__container--plants__wrapper--slides')[0]
        if (isMobile()) plantSlider(slider, sliderItems)
    } else {
        removePlantsContainerElements()
        toggleResults([])
    }
}

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

async function fetchPlantResults(requestParams) {
    const { sun, water, pets } = requestParams
    let result

    await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`)
        .then(response => response.json())
        .then(data => (result = data))

    return result
}
