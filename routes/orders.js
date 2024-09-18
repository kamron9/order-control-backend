// routes/orders.js
const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

// OrderIdni avtomatik generatsiya qilish funksiyasi
const generateOrderId = async () => {
	const lastOrder = await Order.findOne().sort({ orderId: -1 })
	return lastOrder ? lastOrder.orderId + 1 : 1
}

// Buyurtma qo'shish
router.post('/orders', async (req, res) => {
	try {
		const { productTitle, price, status, paymentType, count, details } =
			req.body
		const orderId = await generateOrderId()

		const newOrder = new Order({
			orderId,
			productTitle,
			price,
			status,
			paymentType,
			count,
			details,
		})

		await newOrder.save()
		res.status(201).json(newOrder)
	} catch (error) {
		res.status(500).json({ message: "Order qo'shishda xatolik yuz berdi" })
	}
})

// Buyurtmalarni olish
router.get('/orders', async (req, res) => {
	try {
		const orders = await Order.find()
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ message: 'Buyurtmalarni olishda xatolik yuz berdi' })
	}
})
router.get('/orders/search', async (req, res) => {
	try {
		const { q } = req.query
		if (!q) {
			return res.status(400).json({ message: 'Order ID is required' })
		}
		const order = await Order.findOne({ orderId: q })
		res.status(200).json([order])
	} catch (error) {
		res.status(500).json({ message: 'Buyurtma topilmadi' })
	}
})

router.put('/orders/:id/status', async (req, res) => {
	try {
		const { id } = req.params
		const { status } = req.body

		const order = await Order.findById(id)
		if (!order) {
			return res.status(404).send({ message: 'Order not found' })
		}

		order.status = status
		await order.save()

		res.send({ message: 'Order status updated successfully', order })
	} catch (error) {
		res.status(500).send({ message: 'An error occurred', error })
	}
})

router.get('/orders/stats', async (req, res) => {
	try {
		const orders = await Order.find()

		const stats = {
			total: orders.length,
			status: [
				{
					status: 'new',
					count: orders.filter(order => order.status === 'new').length,
				},
				{
					status: 'in_progress',
					count: orders.filter(order => order.status === 'in_progress').length,
				},
				{
					status: 'completed',
					count: orders.filter(order => order.status === 'completed').length,
				},
				{
					status: 'delevered',
					count: orders.filter(order => order.status === 'delevered').length,
				},
				{
					status: 'canceled',
					count: orders.filter(order => order.status === 'canceled').length,
				},
			],
		}

		res.json(stats)
	} catch (error) {
		res.status(500).json({ message: 'Xatolik yuz berdi', error })
	}
})

module.exports = router
