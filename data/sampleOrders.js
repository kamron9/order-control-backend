// data/sampleOrders.js
const Order = require('../models/Order')

const sampleOrders = [
	{
		productTitle: 'Burger',
		price: 5000,
		status: 'new',
		paymentType: 'cash',
		count: 2,
		details: 'Cheese burger',
	},
	{
		productTitle: 'Pizza',
		price: 8000,
		status: 'in_progress',
		paymentType: 'payme',
		count: 1,
		details: 'Large size with extra cheese',
	},
]

const insertSampleOrders = async () => {
	try {
		for (const order of sampleOrders) {
			const orderId = await Order.findOne().sort({ orderId: -1 })
			const newOrder = new Order({
				orderId: orderId ? orderId.orderId + 1 : 1,
				...order,
			})
			await newOrder.save()
		}
		console.log('Sample orders added')
	} catch (error) {
		console.error('Error adding sample orders:', error)
	}
}

module.exports = insertSampleOrders
