const geocode = require('./geocodeAPI')
const forecast = require('./forecastAPI')

function geoFunction(req, res, countryAddress) {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: countryAddress
            })
        })
    })
}

module.exports =  geoFunction