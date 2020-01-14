const request = require('request')

const forecast = (long, la, callback)=> {
    // https://api.darksky.net/forecast/9f1d05cf5097039bbf8d39259526f347/103.8,1.3?lang=ens
    const urlDarkSky = 'https://api.darksky.net/forecast'  
                        +'/9f1d05cf5097039bbf8d39259526f347' 
                        +'/' + long + ','+ la 
                        +'?lang=en&units=auto'
    // console.log("long :" + long)
    // console.log("la :" + la)
    console.log("urlDarkSky :" + urlDarkSky)
    // const urlDarkSky = 'https://api.darksky.net/forecast/9f1d05cf5097039bbf8d39259526f347/1.3,103.8?units=auto'

    request({ url: urlDarkSky, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather server!', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                 body.daily.data[0].summary  
                 + ' It is currently ' + body.currently.temperature + ' degree celcius.'
                 + ' There is a ' + body.hourly.data[0].precipProbability * 100 + '% chance of rain.'
                 + ' Location timezone : ' + body.timezone
                // summary: body.daily.data[0].summary,
                // currrentTemp: body.currently.temperature,
                // precipProbility: body.hourly.data[0].precipProbability
            )
            // console.log(JSON.stringify(body))
        }
    })
}

module.exports = forecast