const { Orders } = require('../models/orders.model')

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')


const orderExist = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const order = await Orders.findOne({
        where: { id, status: 'active' }
    })

    if (!order) {
        return next(new AppError('this order does not exist'))
    }

    req.order = order
    next()
})

module.exports = { orderExist }