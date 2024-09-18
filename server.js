// server.js
const express = require('express')
const connectDB = require('./config/db')
const orderRoutes = require('./routes/orders')
const cors = require('cors')
// const insertSampleOrders = require('./data/sampleOrders')

const app = express()

// MongoDB ulanishi
connectDB()
// insertSampleOrders()

app.use(express.json())
app.use(cors())

// Routerlardan foydalanish
app.use('/api', orderRoutes)

const PORT = 5000
async function start() {
	try {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (error) {
		console.error('Server error:', error)
		process.exit(1)
	}
}
start()
