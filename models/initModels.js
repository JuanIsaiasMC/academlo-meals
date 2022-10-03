// Models
const { User } = require('./user.model');
const { Meals } = require('./meals.model')
const { Orders } = require('./orders.model')
const { Restaurants } = require('./restaurants.model')
const { Reviews } = require('./reviews.model')

const initModels = () => {
    User.hasMany(Orders, { foreignKey: 'userid' })
    Orders.belongsTo(User)

    User.hasMany(Reviews, { foreignKey: 'userId' })
    Reviews.belongsTo(User)

    Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' })
    Reviews.belongsTo(Restaurants)

    Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' })
    Meals.belongsTo(Restaurants)

    Meals.hasMany(Orders, { foreignKey: 'mealId' })
    Orders.belongsTo(Meals)



};

module.exports = { initModels };
