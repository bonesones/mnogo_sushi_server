import sequelize from "../sequelize.js";
import database from 'sequelize'

const { DataTypes } = database

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING, allowNull: false},
    birthday: {type: DataTypes.DATEONLY},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    isDeleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const BasketProduct = sequelize.define("basket_product", {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})


const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
})



const Category = sequelize.define("category", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})



Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE'})
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Category.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Category)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

export {
    User,
    Basket,
    Product,
    Category,
    BasketProduct,
}