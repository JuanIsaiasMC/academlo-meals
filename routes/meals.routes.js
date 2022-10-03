// router
const express = require('express')

const mealsRouter = express.Router()

// model
const { Meals } = require('../models/meals.model')

// middleware
const { createMealValidators } = require('../middlewares/validators.middlewares')

// controllers
const { createMeal, deleteMeal, getAllMeals, getMealById, updateMeal } = require('../controllers/meals.controllers')

//utils

const { mealExist } = require('../middlewares/meals.middlewares')
const { restaurantExists } = require('../middlewares/restaurant.middlewares')
const { protectAdmin, protectSession, protectUsersAccount } = require('../middlewares/auth.middlewares')




// routes
mealsRouter.get('/', getAllMeals)
mealsRouter.get('/:id', mealExist, getMealById)


mealsRouter.use(protectSession, protectAdmin)
// hacer el validator
mealsRouter.post('/:id', restaurantExists, createMeal)
mealsRouter.patch('/:id', mealExist, updateMeal)
mealsRouter.delete('/:id', mealExist, deleteMeal)


module.exports = { mealsRouter }

