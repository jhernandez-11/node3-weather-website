const request = require("request")

// const urlWeather = 'http://api.weatherstack.com/current?access_key=7f52f87871bb95a8a0a2cac4d02a088f&query=94580&units=f'

// request({ url: urlWeather, json:true }, (error, response) => {
//     if (error) {
//         console.log('Cannot connect to weather app!')
//     } else if (response.body.error) {
//         console.log('Unable to find location!')
//     } else {
//         const currentTemperature = response.body.current.temperature
//         const feelsLike = response.body.current.feelslike
//         const weatherDescription = response.body.current.weather_descriptions[0]

//         console.log(weatherDescription + '. It is currently ' + currentTemperature + '. Feels like ' + feelsLike + '.')
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f52f87871bb95a8a0a2cac4d02a088f&query=' + longitude + ',' + latitude + '&units=f'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to weather app!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. Feels like ' + body.current.feelslike + '.')
        }
    })
}

module.exports = forecast