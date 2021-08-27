
const mongoose = require('mongoose'); 
//url that gives permission to use data base with username and password 
const mongoURI = process.env.dblink;
//add mongoURI variable 

//const connectDB = async () => {
async function connectDB() {
	try {
			await mongoose.connect(mongoURI, {
			useNewUrlParser: true, 
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.error(error.message); 
		process.exit(1); 
	}
};

//allowing other files to have access to connectDB function
module.exports = connectDB; 