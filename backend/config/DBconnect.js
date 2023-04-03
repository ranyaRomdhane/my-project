const mongoose = require ("mongoose");
const DBconnect  = async() => {
    try{
await mongoose.connect(process.env.DB_URI);
console.log('Data Base Is Connected');

    }
    catch (error) {
console.log(error); 
    } 
};

module.exports= DBconnect; 