const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/blogs/", blogRoutes);
app.use("/api/user/", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
