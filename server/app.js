import express from "express"
import "dotenv/config"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// Routes Import
import auth from './routes/auth.js'
import fridge from './routes/fridge.js'
import imageUpload from './routes/imageUpload.js'
import getFood from './routes/getFood.js'
import spoonacular from './routes/spoonacular.js'



dotenv.config()

var app = express()
app.use(express.json())
app.use(cookieParser())


// CORS
const defaultOrigin = "http://localhost:5173";
const envOrigin = process.env.ORIGIN;
const originsToAllow = [defaultOrigin];

if (envOrigin && envOrigin !== defaultOrigin) {
  originsToAllow.push(envOrigin);
}

const corsOptions = {
  origin: originsToAllow,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));


// Use Routes
app.use(auth)
app.use(fridge)
app.use(imageUpload)
app.use(getFood)
app.use(spoonacular)




const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 8080')
})