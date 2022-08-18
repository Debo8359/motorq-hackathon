const { response } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

require("dotenv").config();

const signUpTemplateCopy = require("../models/SignUpModels");
const adminsignUpTemplateCopy = require("../models/adminsignupModel");
const eventModelCopy = require("../models/eventmodel");
const RegevModelCopy = require("../models/Regevmodel");
let user = [];
let flag = false;
let data1 = [];
let curevent = [];

router.post("/signup", (req, res) => {
  signUpTemplateCopy.findOne(
    {
      email: req.body.email,
    },
    "regno email password",
    (err, result) => {
      if (err) console.log(err);
      try {
        if (result != null) {
          throw new Error("Email ID already exists");
          //res.status(404).send("Username exists");
        } else {
          const signedUpUser = new signUpTemplateCopy({
            regno: req.body.regno,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
          });
          signedUpUser
            .save()
            .then((data) => {
              res.json(data);
            })
            .catch((error) => {
              res.json(error);
            });
        }
      } catch (err1) {
        res.sendStatus(800, "Username already Exists");
      }
    }
  );
});

router.post("/login", (req, res) => {
  signUpTemplateCopy.findOne(
    { email: req.body.email, password: req.body.password },
    "email regno password type",
    function (err, login) {
      if (err) {
        res.status(404).send("Error");
        console.log(err);
      } else {
        try {
          data1 = login;
          flag = true;
          login.save().then((data) => {
            res.json(data);
          });
        } catch (err1) {
          res.status(404).send("Error");
          console.log(err1);
        }
      }
    }
  );
});

router.get("/validateUser", (req, res) => {
  console.log(flag);
  res.send(flag);
});

router.get("/fetchdata", (req, res) => {
  console.log(data);
  res.json(data);
});

router.get("/resetdata", (req, res) => {
  data = [];
  console.log(data);
  flag = false;
  res.status(200).send("Done");
});

router.get("/events", (req, res) => {
  eventModelCopy.find(
    {},
    "name stime etime sdate edate vacancy location",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.get("/events", (req, res) => {
  eventModelCopy.find(
    {},
    "name stime etime sdate edate vacancy location",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

router.post("/postevent", (req, res) => {
  try {
    new_id = "_" + Math.random().toString(36).substring(2, 11);
    RegevModelCopy.findOne({ id: new_id }, (err, data) => {
      if (err) {
        print(err);
      } else {
        new_id = "_" + Math.random().toString(36).substring(2, 11);
      }
    });
    console.log(new_id);
    const newevent = new RegevModelCopy({
      id: new_id,
      name: req.body.name,
      sdate: req.body.sdate,
      edate: req.body.edate,
      stime: req.body.stime,
      etime: req.body.etime,
      vacancy: req.body.vacancy,
      location: req.body.location,
      email: data1.email,
    });
    console.log(newevent);
    newevent
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (err1) {
    console.log(err1);
  }
});

router.post("/removeevent", (req, res) => {
  try {
    RegevModelCopy.deleteOne({ id: req.body.id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted succesfully");
        res.send("ok");
      }
    });
  } catch (err1) {
    console.log(err1);
  }
});

router.get("/regevents", (req, res) => {
  RegevModelCopy.find(
    { email: data1.email },
    "id name stime etime sdate edate vacancy location status email",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

router.get("/allregevents", (req, res) => {
  RegevModelCopy.find(
    { status: "pending" },
    "id name stime etime sdate edate vacancy location status email",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

router.post("/newevent", (req, res) => {
  try {
    const newevent = new eventModelCopy({
      name: req.body.name,
      sdate: req.body.sdate,
      edate: req.body.edate,
      stime: req.body.stime,
      etime: req.body.etime,
      vacancy: req.body.vacancy,
      location: req.body.location,
    });
    console.log(newevent);
    newevent
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (err1) {
    console.log(err1);
  }
});

router.post("/whichevent", (req, res) => {
  curevent = req.body.name;
  res.send("done");
});

router.get("/getcurevent", (req, res) => {
  eventModelCopy.findOne(
    { name: curevent },
    "name stime etime sdate edate vacancy location",
    (err, val) => {
      if (err) {
        console.log(err);
      } else {
        res.json(val);
      }
    }
  );
});

router.post("/verify", (req, res) => {
  console.log(req.body);
  RegevModelCopy.findOneAndUpdate(
    { id: req.body.id },
    { status: "verified" },
    (err, val) => {
      if (err) {
        console.log(err);
      } else {
        if (val.status === "verified") res.send("alr");
        else if (val) res.send("done");
        else res.send("no");
      }
    }
  );
});

router.post("/modevent", (req, res) => {
  console.log(req.body);
  eventModelCopy.findOneAndUpdate(
    { name: curevent },
    {
      name: req.body.name,
      sdate: req.body.sdate,
      edate: req.body.edate,
      stime: req.body.stime,
      etime: req.body.etime,
      vacancy: req.body.vacancy,
      location: req.body.location,
    },
    (err, val) => {
      if (err) {
        console.log(err);
      } else {
        console.log(val);
        res.send("done");
      }
    }
  );
});

router.post("/adminsignup", (req, res) => {
  adminsignUpTemplateCopy.findOne(
    {
      email: req.body.email,
    },
    "regno email password",
    (err, result) => {
      if (err) console.log(err);
      try {
        if (result != null) {
          throw new Error("Email ID already exists");
          //res.status(404).send("Username exists");
        } else {
          const signedUpUser = new adminsignUpTemplateCopy({
            regno: req.body.regno,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
          });
          console.log(req.body);
          signedUpUser
            .save()
            .then((data) => {
              res.json(data);
            })
            .catch((error) => {
              res.json(error);
            });
        }
      } catch (err1) {
        res.sendStatus(800, "Username already Exists");
      }
    }
  );
});

router.post("/adminlogin", (req, res) => {
  adminsignUpTemplateCopy.findOne(
    { email: req.body.email, password: req.body.password },
    "email regno password type",
    function (err, login) {
      if (err) {
        res.status(404).send("Error");
        console.log(err);
      } else {
        try {
          data1 = login;
          flag = true;
          login.save().then((data) => {
            res.json(data);
          });
        } catch (err1) {
          res.status(404).send("Error");
          console.log(err1);
        }
      }
    }
  );
});

module.exports = router;
