// model
const { Meals } = require('../models/meals.model')

// utils
const { catchAsync } = require('../utils/catchAsync.util')

const { AppError } = require('../utils/appError.util')

const mealExist = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const meal = await Meals.findOne({
        where: { id, status: 'active' }
    })

    if (!meal) {
        return next(new AppError('this meal does not exist', 400))
    }

    req.meal = meal
    next()
})

module.exports = { mealExist }

