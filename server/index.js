import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import { error } from "console"
import { connect } from "http2"

/* CONFIGURATIONS */

// Get the current module file path and directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get the sensitive message from .env file
dotenv.config()

// Construct some common middlewares processing HTTP requests and adding some functions
const app = express()

// Parse the incoming JSON request body and convert it into a JavaScript object
app.use(express.json()) 

// Add some security related HTTP headers to the Express application to prevent various security threats
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

// Generate an HTTP request log, recording detailed information about the request, such as request method, path, status code, etc
app.use(morgan("common"))

// Parse the JSON request body and URL encoded request body. 
// The limit option is used to limit the size of the request body
// The extended option indicates that the parsed object can be of any data type
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

// Allow cross domain requests
app.use(cors())

// Map the/assets path to the public/assets directory in your server file system so that you can access these static resources through URLs
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))


/* FILE STORAGE */

// Process file upload and save to the server file system
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))