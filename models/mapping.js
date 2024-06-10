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
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})


const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
    parameter: {type: DataTypes.STRING, allowNull: false},
    isCombo: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isDeleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
}, {
    timestamps: false
})


const ProductCombo = sequelize.define('product_combo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ParentId: { type: DataTypes.INTEGER },
    SiblingId: { type: DataTypes.INTEGER }
}, {
    timestamps: false
})



const Category = sequelize.define("category", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {
    timestamps: false
})



Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE'})
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Category.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Category)

User.hasOne(Basket)
Basket.belongsTo(User)



Product.belongsToMany(Product, { through: ProductCombo, as: "Parent", onDelete: 'RESTRICT', foreignKey: 'SiblingId' })
Product.belongsToMany(Product, {through: ProductCombo, as: "Sibling", onDelete: 'RESTRICT', foreignKey: 'ParentId' })

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