import express from "express"
import "dotenv/config"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// Routes Import
import auth from './routes/auth.js'
import fridge from './routes/fridge.js'
import imageUpload from './routes/imageUpload.js'



dotenv.config()

var app = express()
app.use(express.json())
app.use(cookieParser())


const allowedOrigins = process.env.ORIGIN || "http://localhost:5173"
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));


// Use Routes
app.use(auth)
app.use(fridge)
app.use(imageUpload)




const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 8080')
})