import express from 'express'
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan"

import path from "path";
import {fileURLToPath} from "url"
import {connectDB} from "./database/database.js";
import { storage } from "./config/multerConfig.js";
import authRoutes from "./routes/AuthRoutes.js"
import userRoutes from "./routes/UserRoutes.js"
import postRoutes from "./routes/PostRoutes.js"
import { register } from "./controllers/AuthController.js"
import { createPost } from "./controllers/PostController.js"
import { verifyToken } from "./middleware/AuthMiddleware.js";


//CONFIG
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
    //When using type: modules, this is best practice for navigating the directories of a project

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, `public/assets`)))

//FILE STORAGE
const upload = multer({ storage })

//ROUTES w/ FILES
app.post(`/auth/register`, upload.single(`picture`), register)
app.post(`/posts`, verifyToken, upload.single(`picture`), createPost)

//ROUTES
app.use(`/auth`, authRoutes)
app.use(`/users`, userRoutes)
app.use(`/posts`, postRoutes)

//MONGOOSE
const PORT = process.env.PORT || 8000
connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    })
    .catch((error) => {
        console.log(error)
    })