
const weatherForm = document.querySelector('form')
const searchQuery = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchQuery.value
    messageOne.textContent = 'Getting weather forecast'
    messageTwo.textContent = ''
    fetch('/weather/?address=' + location).then((response) => {
    response.json().then((data) => {
        console.log(data)
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else {
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.forecastData    
        }
        })
    })
})


