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

module.exports = router
