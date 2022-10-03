// model
const { Reviews } = require('../models/reviews.model')

// util
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const reviewExist = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const review = await Reviews.findOne({
        where: { id }
    })

    if (!review) {
        return next(new AppError('this review does not exist', 400))
    }

    req.review = review
    next()
})

module.exports = { reviewExist }