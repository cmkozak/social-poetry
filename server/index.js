const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();

mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log({ database_error: err });
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

const userRoutes = require("./api/user/route/user");
app.use("/user", userRoutes);

const postRoutes = require("./api/posts/route/post");
app.use("/post", postRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
