// models
const { Restaurants } = require('../models/restaurants.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const restaurantExists = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const restaurant = await Restaurants.findOne({ where: { id, status: 'active' } })

    if (!restaurant) {
        return next(new AppError('restaurant does not exist', 404))
    }

    req.restaurant = restaurant
    next()
})

module.exports = { restaurantExists }