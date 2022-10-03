const express = require('express')
const ordersRouter = express.Router()

// auth
const { protectAdmin, protectSession, protectUsersAccount, protectOrderOwners } = require('../middlewares/auth.middlewares')

// controllers
const { createOrder, deleteOrderById, getAllOrdersByUser, updateStatusOrderById } = require('../controllers/orders.controller')

// meal
const { mealExist } = require('../middlewares/meals.middlewares')

// order
const { orderExist } = require('../middlewares/orders.middleware')

ordersRouter.use(protectSession)

ordersRouter.post('/', createOrder)
ordersRouter.get('/me', getAllOrdersByUser)
ordersRouter.patch('/:id', orderExist, protectOrderOwners, updateStatusOrderById)
ordersRouter.delete('/:id', orderExist, protectOrderOwners, deleteOrderById)

module.exports = { ordersRouter }