const express = require('express');
const cors = require("cors");
const DBconnect = require("./config/DBconnect");
const app = express();
require('dotenv').config();
DBconnect(); 

const port = process.env.PORT || 5001; 
 app.use(express.json());  
app.use(cors()); 
app.use('/user', require("./Routes/user"));
app.use('/order',require("./Routes/order"));
app.use('/product',require("./Routes/product"));

app.listen(port, (err) => {
err? console.log(err) : console.log(`Server is running succesfully on port: ${port}`);
});


