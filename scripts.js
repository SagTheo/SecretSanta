const userInput  = document.querySelector('.userInput')
const add = document.querySelector('.add')
const ok = document.querySelector('.ok')
const names = []
const hasBeenPicked = []
const pairs = []

add.addEventListener('click', () => {
    if (userInput.value !== '') {
        names.push(userInput.value)
        userInput.value = ''
        userInput.focus()
    }
})


// Needs work -> one name doesn't get picked
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

        pairs.push({name1: name, name2: namesCopy[randomIndex]})
    })

    console.log(pairs)
})