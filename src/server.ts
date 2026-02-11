import { initSchema } from "./db/database";
import app from "./app";

const PORT = parseInt(process.env.PORT || "3000", 10);

initSchema();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
