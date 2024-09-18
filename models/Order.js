const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	details: String,
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
})

const orderSchema = new mongoose.Schema({
	orderId: {
		type: Number,
		unique: true,
	},
	products: {
		type: [productSchema],
		required: true,
	},
	status: {
		type: String,
		enum: ['new', 'in_progress', 'completed', 'delevered', 'canceled'],
		default: 'new',
	},
	paymentType: {
		type: String,
		enum: ['cash', 'payme', 'click', 'uzum'],
		required: true,
	},
	deliveryType: {
		type: String,
		enum: ['courier', 'self'],
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	comments: [String],
})
orderSchema.pre('save', function (next) {
	this.totalPrice = this.products.reduce((acc, product) => {
		return acc + product.price * product.quantity
	}, 0)
	next()
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
