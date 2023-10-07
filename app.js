const express = require('express')
const { connectDB } = require('./DB/connect')
require('dotenv').config()
const { userRouter } = require('./router/app.router')
const app = express()
const {nanoid} = require("nanoid")
const path = require("path")
var flash = require('connect-flash');
var session = require('express-session')
const multer = require('multer')
var MongoDBStore = require('connect-mongodb-session')(session);
app.use(flash())
app.use('/uploadImages', express.static(path.join(__dirname, 'uploadImages')))
var store = new MongoDBStore({
    uri: process.env.CONNECTIONSTRING,
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store

}))

const port = process.env.PORT ||5000

app.use(express.urlencoded({ extended: false }))
app.set('views', 'views')
app.set('view engine', 'ejs')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploadImages')
    },
    filename: function(req, file, cb) {

        cb(null, nanoid() + "_" + file.originalname)
    }
})

function fileFilter(req, file, cb) {

    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)

    } else {
        cb('sorry invalid ex', false)
    }

}



const upload = multer({ dest: 'uploadImages/', fileFilter, storage })
app.use(upload.single('image'))
app.use(userRouter)

connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))