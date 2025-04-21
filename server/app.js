import express from "express"
import "dotenv/config"
import cors from "cors"

import router from "./routes/router.js"


var app = express()
app.use(express.json())


const allowedOrigins = process.env.ORIGIN || "http://localhost:5173"
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));




app.use(router)


const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 8080')
})