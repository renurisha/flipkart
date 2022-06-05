const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
require("./src/db/conn");
const userRoute = require("./src/controllers/user");
const adminRoute = require("./src/controllers/admin");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", adminRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
