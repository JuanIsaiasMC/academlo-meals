// utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util');


// midleware


// model
const { Restaurants } = require('../models/restaurants.model')
const { Reviews } = require('../models/reviews.model')



// functions

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body

    const newRestaurant = await Restaurants.create({ name, address, rating })

    res.status(201).json({
        status: 'succes',
        data: { newRestaurant }
    })

})

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurants.findAll({
        where: { status: 'active' }
    })

    res.status(201).json({
        status: 'succes',
        data: { restaurants }
    })
})

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const restaurants = await Restaurants.findOne({
        where: { id: id }
    })

    res.status(200).json({
        status: 'succes',
        data: { restaurants }
    })
})


const updateRestaurant = catchAsync(async (req, res, next) => {
    const { name, address } = req.body
    const { restaurant } = req
    await restaurant.update({ name, address })
    res.status(200).json({
        status: 'succes',
        data: { restaurant }
    })
})

const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req

    await restaurant.update({ status: 'deleted' })

    res.status(200).json({
        status: 'succes'
    })
})

const createReviewRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params
    // const { restaurant } = req
    const { sessionUser } = req //o user
    const { comment, rating } = req.body

    const newReview = await Reviews.create({
        userId: sessionUser.id,
        comment,
        restaurantId: id,
        rating
    })

    res.status(200).json({
        status: 'succes',
        data: { newReview }
    })
})

const updateReviewRestaurantById = catchAsync(async (req, res, next) => {
    const { review } = req
    const { comment, rating } = req.body
    await review.update({ comment, rating })

    res.status(200).json({
        status: 'succes',
        data: { review }
    })

})

const deleteReviewRestaurantById = catchAsync(async (req, res, next) => {
    const { review } = req

    await review.update({
        status: 'deleted'
    })

    res.status(200).json({
        status: 'succes'
    })
})

module.exports = { createRestaurant, createReviewRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, updateReviewRestaurantById, deleteReviewRestaurantById }