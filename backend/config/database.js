const mongoose = require("mongoose");

const connectDataBase = async () => {

    try {
        const res = await mongoose.connect(process.env.DB_URL);

        const data =  res.connection.host;
        
        console.log(`DATABASE CONNECTED WITH SERVER ${data}`)

    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDataBase;