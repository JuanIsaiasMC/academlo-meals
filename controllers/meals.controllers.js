// modelo
const { Meals } = require('../models/meals.model')
const { Restaurants } = require('../models/restaurants.model')

// utils
const { catchAsync } = require('../utils/catchAsync.util')
const { } = require('../utils/appError.util')


// functions
const createMeal = catchAsync(async (req, res, next) => {
    const { restaurant } = req
    const { name, price } = req.body

    const newMeal = await Meals.create({ name, price, restaurantId: restaurant.id })

    res.status(200).json({
        status: 'succes',
        data: { newMeal }
    })
})

const getAllMeals = catchAsync(async (req, res, next) => {

    const meals = await Meals.findAll({
        where: { status: 'active' }
        , include: { model: Restaurants }
    })

    res.status(200).json({
        status: 'succes',
        data: { meals }
    })

})

const getMealById = catchAsync(async (req, res, next) => {

    const { meal } = req
    const mealById = await Meals.findOne({
        where: { id: meal.id }, include: { model: Restaurants }
    })
    res.status(200).json({
        status: 'succes',
        data: { mealById }
    })
})

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req
    const { name, price } = req.body

    await meal.update({
        name,
        price
    })

    res.status(200).json({
        status: 'succes',
        data: { meal }
    })
})

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req
    await meal.update({
        status: 'deleted'
    })

    res.status(200).json({
        status: 'succes'
    })
})

module.exports = { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal }