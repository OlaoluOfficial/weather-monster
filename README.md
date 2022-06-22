# Introduction

Weather Monster
RESTful API to manage weather measurement reporting and forecast. It takes account of cities and weather conditions.
The API is composed by four endpoints:
/cities
/temperatures
/forecasts
/webhooks

# Overview

- User can create a city.
- User can update a city.
- User can delete a city.
- User can create a temperature.
- User can get specific forecast.
- User can create a webhook.
- User can delete a webhook.

- A city have the following attributes:
- id
- name
- longitude
- latitude

- A temperature have the following attributes:

  - id
  - city_id
  - max
  - min
  - timestamp

- A weather forecast have the following attributes:
  - city_id
  - max
  - min
  - sample

# Response

GET request respond with the actual data.
POST request respond with object with key message and details if request was successful.
PATCH request respond with object with key message and details if request was successful.
DELETE request respond with object with key message and details if request was successful.

# Technologies

- Node
- Typescript
- Express
- Docker
- Postgres
- Sequelize
- Jest
- Zod

#

#

[![Run in Postman](https://documenter.getpostman.com/view/21602578/UzBpLkw1)

[![Live on Heroku](https://weather-monster-plug.herokuapp.com/)]

#

#

**post** _/cities_
{
"name": "sample name",
"latitude": 52.508,
"longitude": 13.404,
}

- All fields are required

**patch** _/cities/:id_
{
"name": "new name",
"latitude": 51.099,
"longitude": 13.778
}

- A city id should be passed as a parameter and at least a field should be provided in the request body

**delete** _/cities/:id_

- The city to be deleted must be passed as a parameter

### temperatures

**post** _/temperatures_
{
"city_id": 1,
"max": 100,
"min": 10,
}

- All fields are required

### forecasts

**get** _/forecasts/:city_id_

- The city id should be passed as a parameter

### webhooks

**post** _/webhooks_
{
"city_id": 1,
"callback_url": "https://example.com/webhook"
}

- The city id and callback_url are required

**delete** _/webhooks/:id_

- The webhook to be deleted must be passed as a parameter

### COMMANDS

Starting Docker to run the Postgres service
yarn docker

Starting Database
yarn db

Starting the app
yarn dev

Running test
yarn test
