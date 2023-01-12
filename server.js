import "dotenv/config.js"
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import methodOverride from 'method-override'

import './config/database.js'

// import routers
import { router as indexRouter } from './routes/index.js'
import { router as flightsRouter } from './routes/flights.js'

// set up app
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
app.use(methodOverride('_method'))

// mounted routers
app.use('/', indexRouter)
app.use('/flights', flightsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export {
  app
}

// Lab Part 2 Exercies:

// 1. Create a mealSchema that will be compiled into a Meal Model with the following properties:
// 2. In the Flight Model, add a reference to the Meal.
// 3. Add a link in the navbar for ‘Add Meal.’ Identify and code the route, then write the controller function to display a `meals/new.ejs` view containing a form for entering new meals.
// 4. Identify the route path/verb for the form. Code the route, then the controller function for creating a new meal. The list of meals should be displayed below the form to prevent the user from entering duplicates. (You’ll need to refactor the controller function from the previous step to include a query for ALL meals to show them on the page!)
// 5. Update the `show` view to display a `<select>` element with an `<option>` for each meal. The user should click a button adjacent to the `<select>` to add the selected meal to the list for that flight.
// 6. Update the `show` view to list all current meals that have been added for the flight. (You’ll need to update the controller function as well. `populate` to the rescue!!!)