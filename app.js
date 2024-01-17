import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import sequelize from './database/connect.js';
import { User, Trips } from './database/models.js';
// import {routerPages, authRouter, orderRouter} from './routes/index.js';
import renderRouter from './routes/renderRouter.js';
import authRouter from './routes/authRouter.js';
import tripsRouter from './routes/tripsRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.use('/', [renderRouter, authRouter, tripsRouter]);

(async () => {
  const PORT = process.env.PORT || 5000;
  
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
