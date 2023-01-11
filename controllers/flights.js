import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.error(error)
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights
    })
  })
  .catch(error => {
    console.error(error)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Detail',
      flight: flight
    })
  })
  .catch(error => {
    console.error(error)
    res.redirect('/')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.error(error)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight
    })
  })
  .catch(error => {
    console.error(error)
    res.redirect('/')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit
}