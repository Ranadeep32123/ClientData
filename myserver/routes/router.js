const express = require("express");
const { trusted, modelNames } = require("mongoose");
const router = express.Router();
const allusers = require("../model/schema");

router.get("/", (req, res) => {
  console.log("connected Now");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, mobile, address } = req.body;

  if (!name || !email || !mobile) {
    res.status(404).send("no data entered");
  } else {
    try {
      console.log("i am here");
      const allusersAlreadyPresent = await allusers.findOne({ mobile: mobile });
      console.log(`validate the duplicate ${allusersAlreadyPresent}`);
      if (allusersAlreadyPresent) {
        res.status(404).send("this users is already present in the db");
      } else {
        const addallusers = new allusers({
          name,
          email,
          mobile,
          address,
        });
        await addallusers.save();
        res.status(201).json(addallusers);
        console.log(addallusers);
      }
    } catch (error) {
      res.status(404).send(error);
      console.log(error);
    }
  }
});
//get userdata
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await allusers.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const individualuser = await allusers.findById({ _id: id });
    console.log(individualuser);
    res.status(201).json(individualuser);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.patch("/updateuser/:id", async (req, res) => {
  try {
    console.log("hi");
    const { id } = req.params;
    console.log(req.body);
    const updateuser = await allusers.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await allusers.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
