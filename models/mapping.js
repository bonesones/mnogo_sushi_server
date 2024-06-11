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
}, {
    timestamps: false
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

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    is_delivery: {type: DataTypes.BOOLEAN, defaultValue: true},
    street_house: {type: DataTypes.STRING, allowNull: true},
    room: {type: DataTypes.STRING, allowNull: true},
    entrance: {type: DataTypes.INTEGER, allowNull: true},
    floor: {type: DataTypes.INTEGER, allowNull: true},
    comment: {type: DataTypes.STRING, allowNull: true},
    phone: {type: DataTypes.STRING, allowNull: true},
    name: {type: DataTypes.STRING, allowNull: true},
    in_time: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    ready_hour: {type: DataTypes.INTEGER, allowNull: true},
    ready_minutes: {type: DataTypes.INTEGER, allowNull: true},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Новый"},
    payment_method: {type: DataTypes.STRING, allowNull: false}
})

const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
})

const Promocode = sequelize.define('promocode', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    min_amount: {type: DataTypes.INTEGER, allowNull: true},
    discount_type: {type: DataTypes.STRING, allowNull: false},
    discount_amount: {type: DataTypes.INTEGER, allowNull: false},
}, {
    timestamps: false
})

const Question = sequelize.define('questions', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
})

const Promotion = sequelize.define('promotion', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
    image: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
})

const CallBack = sequelize.define('callback', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.STRING, allowNull: false},
})

const Slider = sequelize.define('slider', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
    desktop_image: {type: DataTypes.STRING, allowNull: false},
    tablet_phone_image: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
})

Order.hasMany(OrderItem, {as: 'items', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem, {as: 'items', onDelete: "SET NULL"})
OrderItem.belongsTo(Product)

User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)


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
    Order,
    OrderItem,
    Promocode,
    Promotion,
    CallBack,
    Slider
}