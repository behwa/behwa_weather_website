const request = require('request')

const geocode = (address, callback) => {       
    var   locationCountry   = encodeURIComponent(address) + '.json'
    const accessTokenString = 'pk.eyJ1IjoidGh1bXdlaXdhaDkzIiwiYSI6ImNrNHAwdmw5ZDJ0bW0zZHF4YjJuOGN2dDcifQ.sZ8qq_X-fPqJ0z-AyZL1qA'
    const urlGeoCoding      = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
                              + locationCountry 
                              + '?access_token=' + accessTokenString 
                              + '&limit=1' 
    console.log("urlGeoCoding : " + urlGeoCoding)
    
    request( {url: urlGeoCoding, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Message not found', undefined)
        } else {
            callback(undefined, {
                longitude : JSON.stringify(body.features[0].geometry.coordinates[0]),
                latitude  : JSON.stringify(body.features[0].geometry.coordinates[1]),
                location: body.features[0].place_name,
                
            })
            // console.log("body =" + JSON.stringify(body.features[0].geometry.coordinates[1]))

        }
    })
}

module.exports = geocode