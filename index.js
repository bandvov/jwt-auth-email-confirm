const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/index.js");
const errorMiddleware = require("./middleware/error-middleware");
dotenv.config();

const PORT = 5000;

const origin =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
app.disable("x-powered-by");
app.use(
  cors({
    origin,
    credentials: true,
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

app.use("/api", userRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send({ message: "Server is up and running" });
});
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
