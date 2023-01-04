const mongoose = require("mongoose");
const DB =
  "mongodb+srv://newproject:newproject12@cluster0.of4pbwf.mongodb.net/mymerndata?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("not connected");
  });
