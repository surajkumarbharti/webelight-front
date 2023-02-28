import express from "express";

// import data from "./data.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import productRouter from './routes/productRoutes.js'
import userRouter from "./routes/UserRoutes.js";

dotenv.config();
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/Webelight",{
    useNewUrlParser:true
})

.then(() => console.log("mongoose.connected"))
.catch(err => console.log(err)) 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/seed',seedRouter)
app.use('/api/products',productRouter);
app.use('/api/users', userRouter)


app.use((err,req,res,next) => {
    res.status(500).send({message:err.message});
});


const port = process.env.PORT || 5000 ;
app.listen(port , () =>{
    console.log(`serve at http://localhost:${port}`);;
})