const request = require('postman-request')

//
// Goal: Add new data to forecast
//
// 1. Update the forecast string to include new data
// 2. Commit your changes
// 3. Push your changes to GitHub and deploy to Heroku
// 4. Test your work in the live application

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad0f680707e1143e01ec69b74110eb20&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const weatherData = {
                current: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity
            }
            let data = (weatherData.current + '. It is currently ' + weatherData.temperature + ' degrees out. It feels like ' + weatherData.feelsLike + ' degrees out. The humidity is ' + weatherData.humidity + '.')

            callback(undefined, data)
        }
    })
}


module.exports = forecast