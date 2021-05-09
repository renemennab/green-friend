import drop1 from './images/icons/1-drop.svg'
import drop2 from './images/icons/2-drops.svg'
import drop3 from './images/icons/3-drops.svg'
import lowSun from './images/icons/low-sun.svg'
import noSun from './images/icons/no-sun.svg'
import pet from './images/icons/pet.svg'
import toxic from './images/icons/toxic.svg'
import { isMobile } from './utils'

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
    const plantsContainer = document.getElementsByClassName('main--results__container--plants__wrapper--slides')[0]

    plantsArray.forEach((plant, index) => {
        // create elements
        const plantContainer = document.createElement('div')
        const plantImageContainer = document.createElement('div')
        const plantImage = document.createElement('img')
        const plantName = document.createElement('h4')
        const price = document.createElement('span')
        const iconsContainer = document.createElement('div')
        const petIcon = document.createElement('img')
        const sunIcon = document.createElement('img')
        const waterIcon = document.createElement('img')

        // append elements
        plantContainer.className = 'main--results__container--plants__wrapper--slides__plant'
        if (!index && !isMobile()) plantContainer.classList.add('highlightedElement')

        plantsContainer.append(plantContainer)
        plantContainer.append(plantImageContainer, plantName, price, iconsContainer)
        plantImageContainer.append(plantImage)
        iconsContainer.append(petIcon, sunIcon, waterIcon)

        // add attribute to elements
        plantImageContainer.className = 'plantImage'
        plantImage.setAttribute('src', plant.url)
        plantName.textContent = plant.name
        plantName.className = 'plantName'
        price.textContent = '$' + plant.price
        price.className = 'plantPrice'
        iconsContainer.className = 'plantIcons'

        const sunIcons = {
            high: lowSun,
            low: lowSun,
            no: noSun
        }
        const waterIcons = {
            daily: drop3,
            regularly: drop2,
            rarely: drop1
        }
        petIcon.setAttribute('src', plant.toxicity ? toxic : pet)
        sunIcon.setAttribute('src', sunIcons[plant.sun])
        if (plant.sun === sunIcons.low) {
            sunIcon.setAttribute('height', '10px')
        }
        waterIcon.setAttribute('src', waterIcons[plant.water])
    })
}
