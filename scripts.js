const userInput  = document.querySelector('.userInput')
const add = document.querySelector('.add')
const ok = document.querySelector('.ok')
const reset = document.querySelector('.reset')
const randomDraw = document.querySelector('.randomDraw')
const namesList = document.querySelector('.namesList')
let names = []
let hasBeenPicked = []
let pairs = []

const capitalised = word => {
    return word[0].toUpperCase() + word.slice(1)
}

add.addEventListener('click', () => {
    if (userInput.value !== '') {
        const nameItemContainer = document.createElement('div')
        const nameItem = document.createElement('span')
        const modify = document.createElement('button')

        nameItemContainer.setAttribute('class', 'nameItemContainer')
        nameItem.textContent = capitalised(userInput.value)
        modify.textContent = 'Modify'
        modify.setAttribute('class', 'modify')

        modify.addEventListener('click', () => {
            modify.disabled = true

            const toModify = document.createElement('input')
            toModify.setAttribute('placeholder', 'Press enter to validate')

            nameItemContainer.prepend(toModify)
            nameItem.textContent = ''

            toModify.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    nameItem.textContent = capitalised(toModify.value)
                    toModify.setAttribute('class', 'hidden')
                    modify.disabled = false

                    const index = Array.from(nameItemContainer.parentNode.children).indexOf(nameItemContainer)
                    names.splice(index, 1, toModify.value)
                }
            })
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
    /*
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
        currentDraw.textContent = `${capitalised(pair.name1)} picked ${capitalised(pair.name2)}`
        randomDraw.append(currentDraw)
    })
    */

    // Make a copy of the names array
    // Shuffle it so that each item has a different index that in the original array
    // Loop through the original array and create pairs with its copy

    const namesCopy = []

    for (let i = 0; i < names.length; i++) {
        let newIndex = i

        while (newIndex === i) {
            newIndex = Math.floor(Math.random() * names.length)
        }

        namesCopy.push(names[newIndex])
    }

    console.log(names)
    console.log(namesCopy)

    namesList.textContent = ''
    ok.disabled = true
    add.disabled = true
})

reset.addEventListener('click', () => {
    names = []
    hasBeenPicked = []
    pairs = []

    randomDraw.innerHTML = ''
    namesList.innerHTML = ''

    ok.disabled = false
    add.disabled = false
})