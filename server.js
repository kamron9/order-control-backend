// server.js
const express = require('express')
const connectDB = require('./config/db')
const orderRoutes = require('./routes/orders')
const cors = require('cors')
// const insertSampleOrders = require('./data/sampleOrders')

const app = express()

// MongoDB ulanishi
connectDB()

app.use(express.json())
app.use(cors())

// Routerlardan foydalanish
app.use('/api', orderRoutes)

const PORT = process.env.PORT || 5000

const startApp = async () => {
	try {
		// await insertSampleOrders()
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (error) {
		console.error('Error starting server:', error)
		process.exit(1)
	}
}
startApp()
