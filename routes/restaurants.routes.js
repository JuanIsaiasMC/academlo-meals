const express = require('express')

const restaurantsRouter = express.Router()

// controllers
const { createRestaurant, createReviewRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, updateReviewRestaurantById, deleteReviewRestaurantById } = require('../controllers/restaurants.controller')

// middlewares
const { protectAdmin, protectSession, protectUsersAccount, protectReviewsOwners } = require('../middlewares/auth.middlewares')

const { restaurantExists } = require('../middlewares/restaurant.middlewares')
const { reviewExist } = require('../middlewares/review.middlewares')

const { userExists } = require('../middlewares/users.middlewares')

const { createRestaurantValidators } = require('../middlewares/validators.middlewares')
// rutas
restaurantsRouter.get('/', getAllRestaurants)
restaurantsRouter.get('/:id', restaurantExists, getRestaurantById)


restaurantsRouter.use(protectSession)


restaurantsRouter.patch('/:id', protectAdmin, restaurantExists, updateRestaurant)

restaurantsRouter.delete('/:id', protectAdmin, restaurantExists, deleteRestaurant)

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant)

restaurantsRouter.post('/reviews/:id', restaurantExists, createReviewRestaurant)

// el siguiente endpoint falla 
restaurantsRouter.patch('/reviews/:id', reviewExist, protectReviewsOwners, updateReviewRestaurantById)

restaurantsRouter.delete('/reviews/:id', reviewExist, protectReviewsOwners, deleteReviewRestaurantById)


module.exports = { restaurantsRouter }