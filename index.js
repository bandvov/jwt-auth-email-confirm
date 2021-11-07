const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {userRouter} = require("./routes/index.js");

dotenv.config();

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use("/api", userRouter);
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log("Server started on ", PORT);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
