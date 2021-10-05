const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define path for Express config
const dir = path.join(__dirname, '../public')
//Define path for hbs partials
const partialsPath = path.join(__dirname, '../partials')
//Setup static directory to serve
app.use(express.static(dir))
hbs.registerPartials(partialsPath)

//Setup handlebars engine
app.set('view engine', 'hbs')


app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Alp Uygur'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Alp Uygur'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Alp Uygur'
    })
})

app.get('/weather', (request, response) => {
    if (!request.query.address) {
        response.send({
            error: "You must provide an address"
        })
    }
    else {
        geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) return response.send({ error })

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) return response.send({ error })
                else {
                    response.send({
                        forecast: location, forecastData
                    })
                }
            })
        })
    }
})

app.get('/help/*', (request, response) => {
    response.render("error", {
        title: "404",
        name: "Alp",
        errorMessage: "Help article not found"
    })
})

app.get('*', (request, response) => {
    response.render("error", {
        title: "404",
        name: "Alp",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})