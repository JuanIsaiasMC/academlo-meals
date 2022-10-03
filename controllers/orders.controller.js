const { Orders } = require('../models/orders.model')
const { Meals } = require('../models/meals.model')
const { Restaurants } = require('../models/restaurants.model')


const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createOrder = catchAsync(async (req, res, next) => {
    const { quantity, mealId } = req.body
    const { sessionUser } = req

    const meal = await Meals.findOne({
        where: { id: mealId }
    })

    if (!meal) {
        return next(new AppError('this meal does not exist'))
    }



    const newOrder = await Orders.create({
        mealId,
        userId: sessionUser.id,
        quantity,
        totalPrice: meal.price * quantity
    })

    res.status(200).json({
        status: 'succes',
        data: { newOrder }
    })

    console.log(quantity)
})


const getAllOrdersByUser = catchAsync(async (req, res, next) => {
    const { sessionUser } = req
    const order = await Orders.findAll({
        where: { userId: sessionUser.id },
        include: { model: Meals, include: { model: Restaurants } }
    })
    // falta incluir restaurantes y meals

    res.status(200).json({
        status: 'succes',
        data: { order }
    })
})

const updateStatusOrderById = catchAsync(async (req, res, next) => {
    const { order } = req
    await order.update({
        status: 'completed'
    })

    res.status(200).json({
        status: 'succes',
        data: { order }
    })
})

const deleteOrderById = catchAsync(async (req, res, next) => {
    const { order } = req
    await order.update({
        status: 'deleted'
    })

    res.status(200).json({
        status: 'succes',
        data: { order }
    })
})

module.exports = { createOrder, getAllOrdersByUser, updateStatusOrderById, deleteOrderById }