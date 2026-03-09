require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { swaggerUi, specs } = require("./shared/config/swagger");

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Import feature routes
const authRoutes = require("./features/auth/interfaces/routes/auth.routes");
const userRoutes = require("./features/user/interfaces/routes/user.routes");
const productRoutes = require("./features/product/interfaces/routes/product.routes");

// Share middlewares
const responseMiddleware = require("./shared/middlewares/response.middleware");
const errorMiddleware = require("./shared/middlewares/error.middleware");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 1211;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
