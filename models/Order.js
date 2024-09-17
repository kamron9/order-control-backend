// models/Order.js
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	orderId: {
		type: Number,
		unique: true,
	},
	productTitle: String,
	price: Number,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ['new', 'in_progress', 'completed', 'delevered'],
		default: 'new',
	},
	paymentType: {
		type: String,
		enum: ['cash', 'payme', 'click', 'uzum'],
		required: true,
	},
	count: Number,
	details: String,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
