import express from 'express';
import morgan from 'morgan';
import rutas from './routes';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(cors());
// port 
app.set("port",process.env.PORT || 3100)

app.use("/", rutas);


export default app;