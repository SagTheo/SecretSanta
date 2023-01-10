const userInput  = document.querySelector('.userInput')
const add = document.querySelector('.add')
const ok = document.querySelector('.ok')
const reset = document.querySelector('.reset')
const randomDraw = document.querySelector('.randomDraw')
const namesList = document.querySelector('.namesList')
let names = []
let hasBeenPicked = []
let pairs = []

/*
    To do: add 'Modify' button next to each namesList item to modify the name if need be
    ! Needs to be modified in the names array too !
*/

const capitalised = word => {
    return word[0].toUpperCase() + word.slice(1)
}

add.addEventListener('click', () => {
    if (userInput.value !== '') {
        const nameItemContainer = document.createElement('div')
        const nameItem = document.createElement('span')
        const modify = document.createElement('button')

        nameItem.textContent = capitalised(userInput.value)
        modify.textContent = 'Modify'

        modify.addEventListener('click', () => {
            console.log(nameItem.textContent)
        })
        
        nameItemContainer.append(nameItem)
        nameItemContainer.append(modify)
        namesList.append(nameItemContainer)

        names.push(userInput.value)
        userInput.value = ''
        userInput.focus()
    }
})


ok.addEventListener('click', () => {
    names.forEach(name => {
        const namesCopy = names.slice()
        namesCopy.splice(names.indexOf(name), 1)

        hasBeenPicked.forEach(picked => {
            if (namesCopy.includes(picked)) {
                namesCopy.splice(namesCopy.indexOf(picked), 1)
            }
        })

        const randomIndex = Math.floor(Math.random() * namesCopy.length)
        const pickedName = namesCopy[randomIndex]

        pairs.push({name1: name, name2: pickedName})
        hasBeenPicked.push(pickedName)
    })

    pairs.forEach(pair => {
        const currentDraw = document.createElement('li')
        currentDraw.textContent = `${pair.name1} picked ${pair.name2}`
        randomDraw.append(currentDraw)
    })
})

reset.addEventListener('click', () => {
    names = []
    hasBeenPicked = []
    pairs = []

    randomDraw.innerHTML = ''
    namesList.innerHTML = ''
})