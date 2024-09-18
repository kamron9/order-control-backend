// // data/sampleOrders.js
// const Order = require('../models/Order')

// const sampleOrders = [
// 	{
// 		orderId: 122333,
// 		products: [
// 			{
// 				id: 101,
// 				title: 'Product 1',
// 				details: 'Description of Product 1',
// 				price: 100,
// 				quantity: 2,
// 			},
// 			{
// 				id: 102,
// 				title: 'Product 2',
// 				details: 'Description of Product 2',
// 				price: 150,
// 				quantity: 1,
// 			},
// 		],
// 		status: 'new',
// 		paymentType: 'cash',
// 		deliveryType: 'courier',
// 		comments: ['Please deliver between 2-3 PM', 'Handle with care'],
// 	},
// 	{
// 		orderId: 2232,
// 		products: [
// 			{
// 				id: 103,
// 				title: 'Product 3',
// 				details: 'Description of Product 3',
// 				price: 200,
// 				quantity: 1,
// 			},
// 		],
// 		status: 'in_progress',
// 		paymentType: 'payme',
// 		deliveryType: 'self',
// 		comments: ['Will pick up from the store'],
// 	},
// 	{
// 		orderId: 23233,
// 		products: [
// 			{
// 				id: 104,
// 				title: 'Product 4',
// 				details: 'Description of Product 4',
// 				price: 300,
// 				quantity: 3,
// 			},
// 			{
// 				id: 105,
// 				title: 'Product 5',
// 				details: 'Description of Product 5',
// 				price: 50,
// 				quantity: 5,
// 			},
// 		],
// 		status: 'completed',
// 		paymentType: 'click',
// 		deliveryType: 'courier',
// 		comments: ['Leave at the front door', 'Call upon arrival'],
// 	},
// ]

// const calculateTotalPrice = products => {
// 	return products.reduce((total, product) => {
// 		return total + product.price * product.quantity
// 	}, 0)
// }

// const insertSampleOrders = async () => {
// 	try {
// 		for (const order of sampleOrders) {
// 			order.totalPrice = calculateTotalPrice(order.products)
// 			const orderId = await Order.findOne().sort({ orderId: -1 })
// 			const newOrder = new Order({
// 				orderId: orderId ? orderId.orderId + 1 : 1,
// 				...order,
// 			})
// 			await newOrder.save()
// 		}
// 		console.log('Sample orders added')
// 	} catch (error) {
// 		console.error('Error adding sample orders:', error)
// 	}
// }

// module.exports = insertSampleOrders
