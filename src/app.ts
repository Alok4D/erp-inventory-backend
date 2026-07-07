import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
import config from './app/config';

app.use(
  cors({
    origin: [config.frontend_url as string, 'http://localhost:5173', 'https://erp-inventory-frontend-one.vercel.app', 'https://smart-erp-dashboard.vercel.app'],
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const message = "<h1> Mini ERP System API is running successfully!</h1>";
  res.send(message);
};

app.get("/", test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
