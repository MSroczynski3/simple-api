import express from "express";
import swaggerUi from "swagger-ui-express";
import { requestId } from "./middleware/requestId";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import healthRouter from "./routes/health";
import todosRouter from "./routes/todos";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(requestId);
app.use(logger);

// Swagger documentation
// Expose JSON spec
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(healthRouter);
app.use(todosRouter);

app.use(errorHandler);

export default app;
