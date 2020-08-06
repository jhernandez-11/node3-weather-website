const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()

// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Luis Hdz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Luis Hdz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'If you need help, Google it!',
        name: 'Luis Hdz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }


    console.log(req.query.rating)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        text: 'Help article not found!',
        name: 'Luis Hdz'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        text: 'Page not found!',
        name: 'Luis Hdz'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})