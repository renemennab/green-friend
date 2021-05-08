/**
 *
 * @param {{id: number,
 * name: string,
 * price: number,
 * staff_favorite: boolean,
 * sun: "high" | "low" | "no",
 * toxicity: boolean,
 * url: string,
 * water: "rarely" | "regularly"| "daily"}[]} plantsArray
 */
export default function createPlantElements(plantsArray) {
    const resultsContainer = document.getElementsByClassName('main--results__container')[0]
    const containerIcon = document.createElement('img')
    const containerTitle = document.createElement('h2')
    const plantsContainer = document.createElement('div')
    resultsContainer.append(containerIcon, containerTitle, plantsContainer)
    containerIcon.className = 'main--results__container--icon'
    containerTitle.className = 'main--results__container--title'
    plantsContainer.className = 'main--results__container--plants'
    containerTitle.textContent = 'Our picks for you'

    plantsArray.forEach((plant, index) => {
        // create elements
        const plantContainer = document.createElement('div')
        const plantImageContainer = document.createElement('div')

        const plantImage = document.createElement('img')
        const plantName = document.createElement('h4')
        const price = document.createElement('span')
        const iconsContainer = document.createElement('div')
        const icon = document.createElement('img')

        // append elements
        if (!index) plantContainer.className = 'staffPick'

        plantsContainer.append(plantContainer)
        plantContainer.append(plantImageContainer, plantName, price, iconsContainer)
        plantImageContainer.append(plantImage)
        iconsContainer.append(icon)

        // add attribute to elements
        plantImageContainer.className = 'plantImage'
        plantImage.setAttribute('src', plant.url)
        plantName.textContent = plant.name
        plantName.className = 'plantName'
        price.textContent = '$' + plant.price
        price.className = 'plantPrice'
        iconsContainer.className = 'plantIcons'
    })
}
