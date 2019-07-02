// General imports
import express from "express";
import path from "path";
import cors from "cors";

// Routes
import indexRouter from "./routes/index";

// Init express
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up routes
app.use("/", indexRouter);

module.exports = app;
