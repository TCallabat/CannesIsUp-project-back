const api = require("./api.json")
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("./middleware/cors");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://localhost:27017/databasecannes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected");
});

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const adherentRouter = require("./routes/adherent");

const app = express();
const port = api.server.port;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors.handle);

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/adherent", adherentRouter);

app.listen(port, () => {
    console.log("running on port " + port);
});