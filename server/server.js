const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const path = require("path");
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Change to production"));
}

app.use(errorHandler);

app.listen(port);
