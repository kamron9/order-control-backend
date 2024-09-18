// config/db.js
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://kamronalimov80:kamron99@cluster0.1xcqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				serverSelectionTimeoutMS: 5000,
			}
		)
		console.log('MongoDB connected')
	} catch (error) {
		console.error('MongoDB connection error:', error)
		process.exit(1)
	}
}

module.exports = connectDB
