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
    const namesCopy = []
    const usedIndices = []
    let startPos = true

    for (let i = 0; i < names.length; i++) {
        const remainingIndices = names.slice()
        remainingIndices.splice(i, 1)

        if (usedIndices.length > 0) {
            usedIndices.forEach(item => {
                if (remainingIndices.includes(item)) {
                    remainingIndices.splice(remainingIndices.indexOf(item), 1)
                }
            })

            if (startPos) {
                namesCopy.push(remainingIndices[0])
                usedIndices.push(remainingIndices[0])

                startPos = !startPos
            } else {
                namesCopy.push(remainingIndices[remainingIndices.length - 1])
                usedIndices.push(remainingIndices[remainingIndices.length - 1])

                startPos = !startPos
            }

        } else {
            namesCopy.push(remainingIndices[0])
            usedIndices.push(remainingIndices[0])

            startPos = !startPos
        }
    }

    for (let i = 0; i < names.length; i++) {
        const drawItem = document.createElement('p')
        drawItem.textContent = `${capitalised(names[i])} picked ${capitalised(namesCopy[i])}`

        randomDraw.append(drawItem)
    }

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