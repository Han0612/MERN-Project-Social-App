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
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { verifyToken } from "./middlewares/auth.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"



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


/* ROUTES WITH FILES */

// When the client requests access to the/auth/register path through POST, 
// the upload.single ("picture") middleware is first used to process the uploaded file, 
// and then the processing process is handed over to the register processing function to complete the registration logic
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)


/* ROUTES */
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

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