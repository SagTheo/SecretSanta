const userInput  = document.querySelector('.userInput')
const add = document.querySelector('.add')
const ok = document.querySelector('.ok')
const names = []

add.addEventListener('click', () => {
    if (userInput.value !== '') {
        names.push(userInput.value)
        userInput.value = ''
        userInput.focus()
    }
})

ok.addEventListener('click', () => {
    names.forEach(name => {
        const namesCopy = names.slice()
        namesCopy.splice(names.indexOf(name), 1)

        console.log(namesCopy)
    })
})