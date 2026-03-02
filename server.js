const express = require("express");
const cookieParser = require("cookie-parser");

const { swaggerUi, specs } = require("./config/swagger");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Import routes
const userRoutes = require("./interfaces/routes/user.routes");
const authRoutes = require("./interfaces/routes/auth.routes");
const errorMiddleware = require("./interfaces/middlewares/error.middleware");


// Route chính
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Lấy PORT từ file .env (fallback 3000 nếu không có)
const PORT = process.env.PORT || 3000;

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error middleware
app.use(errorMiddleware);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});