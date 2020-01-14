const path = require('path')

const express = require('express'),
      app = express()
const hbs = require('hbs')

// const geocode = require('./utils/geocodeAPI')
// const forecast = require('./utils/forecastAPI')

const mainWeather = require('./utils/MainWeather')

// console.log("__dirname = " + __dirname)
// console.log("__filename = " + __filename)
// console.log("path.join = " + path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead',
        helpMsg: 'This is help Msg'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide a address"
        })
    }
    
    var countryAddress = req.query.address.replace(/['"]+/g, '')
    mainWeather(req, res, countryAddress)
})

app.get('/products', (req, res) => {
    // http://localhost:8080/products?search=games&rating=5
    if (!req.query.search) {
        console.log("req.query =" + req.query.search)
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpError', {
        title: 'Help Error Page!',
        helpErrorMsg: 'Help article not found',
        footerDetail: 'Help error footer'
    })
    // res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'Error 404 Page!',
        error404Msg: 'Page Not Found 404 page',
        footerDetail: 'Error 404 footer'
    })
    // res.send('Page Not Found 404 page')
})


const port = 8080;
app.listen(port, () => {
    console.log("Port running on " + port)
})
