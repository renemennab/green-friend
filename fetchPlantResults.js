export default async function fetchPlantResults(requestParams) {
    const { sun, water, pets } = requestParams
    let result
    if (sun && water && pets) {
        await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`)
            .then(response => response.json())
            .then(data => (result = data))
    }

    return result
}
