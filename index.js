const express = require('express')
const app = express();
const { connectToMongoDb } = require('./connection')
const userRouter = require('./routes/userRoute')
const movieRouter = require('./routes/movieRoute')
const PORT = 3000;

connectToMongoDb('mongodb://127.0.0.1:27017/MovieApp_Backend')
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("MongoDb error:" + err))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/user', userRouter)
app.use('/api/movie', movieRouter)


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);

})