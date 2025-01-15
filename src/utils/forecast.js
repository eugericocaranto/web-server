const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = "https://api.weatherstack.com/current?access_key=c4521145f1d1f66d818199e347698c05&query=" + latitude + "," + longitude + "&units=f";

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
    }
  });
}

module.exports = forecast;