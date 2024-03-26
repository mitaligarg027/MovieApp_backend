const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const { connectToMongoDb } = require('./connection')
const { restrictToLoggedinUserOnly } = require('./middlewares/restrictAuth')
const userRouter = require('./routes/userRoute')
const movieRouter = require('./routes/movieRoute')
const PORT = 3000;
app.use(cors())
app.use(express.static('utils'))
connectToMongoDb('mongodb://127.0.0.1:27017/MovieApp_Backend')
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("MongoDb error:" + err))

app.use(express.json());
//multer image upload
app.use(bodyParser.json())




app.use(express.urlencoded({ extended: false }))
app.use('/api/user', userRouter)
app.use('/api/movie', restrictToLoggedinUserOnly, movieRouter)



app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);

})