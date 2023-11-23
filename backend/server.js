import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// project imports
// import userRoutes from "./routes/user.js";
import { createError } from "./utils/createError.js";

// configurations
const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

const image = "./uploads/image url";

// const images = [
//     "./uploads/image url1",
//     "./uploads/image url2"
// ]

// const upload = multer({ dest: "uploads/" })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), async (req, res) => {
  // app.post("/upload", upload.fields([{ name "profileImage" }, { name: "coverImage" }]), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

app.post("uploads", async (req, res) => {
  // for (const image of images) {
  const result = await cloudinary.uploader.upload(image);
  console.log(result.secure_url);
  // }
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  let error = { ...err };

  // handling mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = createError(message, 400);
  }

  res.status(err.status).json({
    message: "Failed",
    status: error.status || 500,
    error: error.message || "Something went wrong",
  });
});

const PORT = process.env.PORT;

// const connect = async () => {
//   try {
//     await mongoose
//       .connect("")
//       .then(() => app.listen(PORT, console.log("server is running")));
//   } catch (error) {}
// };

// connect();

app.listen(5001, console.log("server is running"));
