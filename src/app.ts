import express from "express";
import { requestId } from "./middleware/requestId";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import healthRouter from "./routes/health";
import todosRouter from "./routes/todos";

const app = express();

app.use(express.json());
app.use(requestId);
app.use(logger);

app.use(healthRouter);
app.use(todosRouter);

app.use(errorHandler);

export default app;
