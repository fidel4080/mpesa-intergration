import express from "express";
import cors from "cors";
import router from './routes/mpesa.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/mpesa', router);


export default app;