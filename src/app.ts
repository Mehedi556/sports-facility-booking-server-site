import express, { Application, Request, Response } from 'express'
import router from './app/routes';
import cors from 'cors'
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:5173'], credentials: true}));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Sports Facility Booking app is running..')
})

app.use(globalErrorHandler);

app.use(notFound);

export default app;