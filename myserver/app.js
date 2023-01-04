const express = require("express");
require("dotenv").config();
const app = express();
require("./db/connection");
const cors = require("cors");
const router = require("./routes/router");
const port = 8005;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

app.listen(port, "0.0.0.0", () => {
  console.log(`server started at port no ${port}`);
});
