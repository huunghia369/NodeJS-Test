require("dotenv").config();
const express = require("express");
const { configureCors } = require("./config/corsConfig.js");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware.js");
const { globalErrorHandler } = require("./middleware/errorHandler.js");
const { urlVersioning } = require("./middleware/apiVersioning.js");
const { createBasicRateLimiter } = require("./middleware/rateLimiting.js");
const itemRoutes = require("./routes/item-routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

// express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15 * 60 * 1000)); // limit 2 requests per 15 minutes
app.use(express.json());

app.use(urlVersioning("v1"));
app.use("/api/v1", itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
