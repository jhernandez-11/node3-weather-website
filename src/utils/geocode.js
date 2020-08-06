const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9zZWhkejk4IiwiYSI6ImNrZGV3Mzk5OTE4MGIyd210NDFoZnNxNnUifQ.iDf6YzmBmb0jjKfd2SscfQ&limit=1'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geocoding!', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found, please try again!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode