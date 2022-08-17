const { response } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
require("dotenv").config();

const parseEnvToJson = require("parse-env-to-json");

const signUpTemplateCopy = require("../models/SignUpModels");
const serverTemplate = require("../models/serverModel");
//const sampleJson = require("../syncJsons/sg_8.10.json");
const fs = require("fs");
let data = [];
let flag = false;
let servers = [];
let sampleJson = [];
router.post("/signup", (req, res) => {
  signUpTemplateCopy.findOne(
    { username: req.body.username },
    "username email password",
    (err, result) => {
      if (err) console.log(err);
      try {
        if (result != null) {
          throw new Error("Username already exists");
          //res.status(404).send("Username exists");
        } else {
          const signedUpUser = new signUpTemplateCopy({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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

router.post("/reset", (req, res) => {
  signUpTemplateCopy.findOne(
    { username: req.body.username },
    "username email password",
    function (err, reset) {
      if (err) console.log(err);
      else {
        reset.password = req.body.password;
        reset.save().then((data) => {
          res.json(data);
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  signUpTemplateCopy.findOne(
    { username: req.body.username, password: req.body.password },
    "username email password",
    function (err, login) {
      if (err) {
        res.status(404).send("Error");
        console.log(err);
      } else {
        try {
          data = login;
          flag = true;
          console.log(login);
          console.log(process.env.SYNCGATEWAY_URL);
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

router.get("/data", (req, res) => {
  let k = [];
  signUpTemplateCopy.find({}, "username email password", function (err, data) {
    if (err) {
      res.status(404).send("Error");
      console.log(err);
    } else {
      res.send(data);
    }
  });
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

router.get("/servers", (req, res) => {
  let k = [];
  serverTemplate.find(
    {},
    "key name user host ref repo path pre_deploy_local pre_deploy post_deploy pre_setup post_setup json",
    function (err, data) {
      if (err) {
        res.status(404).send("Error");
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.post("/editserver", (req, res) => {
  serverTemplate.findOne({ _id: req.body._id }, "name", function (err, reset) {
    if (err) console.log(err);
    else {
      reset.name = req.body.name;
      reset.key = req.body.key;
      reset.user = req.body.user;
      reset.host = req.body.host;
      reset.ref = req.body.ref;
      reset.repo = req.body.repo;
      reset.path = req.body.path;
      reset.pre_deploy_local = req.body.pre_deploy_local;
      reset.pre_deploy = req.body.pre_deploy;
      reset.post_deploy = req.body.post_deploy;
      reset.pre_setup = req.body.pre_setup;
      reset.post_setup = req.body.post_setup;
      reset.save().then((data) => {
        res.json(data);
      });
    }
  });
});

const obtain = async () => {
  const h = await parseEnvToJson("./.env", ["NAME", "AGE"]);
  return h;
};

router.post("/addserver", (req, res) => {
  console.log(req.body);
  const new_server = new serverTemplate(req.body);
  new_server
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/fetchkeys", (req, res) => {
  let k = [];
  serverTemplate.find(
    {},
    "key name user host ref repo path pre_deploy_local pre_deploy post_deploy pre_setup post_setup",
    function (err, data) {
      if (err) {
        res.status(404).send("Error");
        console.log(err);
      } else {
        console.log(data[0]);
        for (var key in data[0]) {
          console.log(key);
        }
      }
    }
  );
});

router.get("/template", (req, res) => {
  const f = new serverTemplate({});
  console.log(f);
  res.send(f);
});

var d1 = "empty";

router.post("/postname", (req, res) => {
  d1 = req.body;
  console.log(d1);
  res.sendStatus(200);
});

router.get("/getname", (req, res) => {
  console.log("getname:\n" + d1);
  res.send(d1);
});

router.get("/fetchJson", (req, res) => {
  /*envPath = `../backend/syncJsons/${data.name}/.env`;
  sampleJson = await parseEnvToJson(envPath, [
    "SERVER_URL",
    "ADMIN_URL",
    "SYNCGATEWAY_URL",
    "SYNCGATEWAY_ADMIN_URL",
    "COUCHBASE_BUCKET",
    "COUCHBASE_DOMAIN",
    "COUCHBASE_CONSOLE",
    "COUCHBASE_USER",
    "COUCHBASE_PASSWORD",
    "COUCHBASE_API_FILTER_VIEW",
    "DAILY_LOG_REPORT_ENABLED",
    "CUSTOM_DAILY_LOG_REPORT_ENABLED",
    "LINE_OUT_TEMPLATE_NAME",
    "DEFECT_SUMMARY_REPORT_ENABLED",
    "TIMESHEETS_REPORT_ENABLED",
    "TRIPS_REPORT_ENABLED",
    "ENGINE_HOURS_REPORT_ENABLED",
    "EXTERNAL_SQL_API_URL",
    "EXTERNAL_SQL_API_KEY",
    "DAILY_REPORT_ENABLED",
    "DAILY_SINKING_REPORT",
    "ETN_DAILY_REPORT_ENABLED",
    "SUPERVISOR_NAME",
    "SUPERVISOR_PASSWORD",
    "BEACON",
    "BEACON_URL",
    "BEACON_CLIENTID",
    "BEACON_CLIENTTOKEN",
    "WEEKLY_LOG_REPORT_ENABLED",
    "MONTHLY_LOG_REPORT_ENABLED",
    "REDIS_HOST",
    "REDIS_PORT",
    "NOTIFICATION_PROXY_HOST",
    "NOTIFICATION_PROXY_PORT",
    "NOTIFICATION_ENV",
    "DAILY_HAULAGE_REPORT_SHIFTS",
    "DAILY_MATERIAL_REPORT_SHIFTS",
    "EQ_STATE_CRON_ENABLED",
    "EQ_STATE_CRON_STATE_CATEGORY",
    "cutsheet_drive",
    "bolting_standards_drive",
    "vent_map_drivevent_map_drive",
    "mine_map_drive",
    "INITIAL_CRON_ENABLED",
    "MAILGUN_API_KEY",
    "MAILGUN_DOMAIN",
    "MAILGUN_SENDER",
    "NOTIFY_ENGINE_HOURS",
    "NOTIFY_NO_FOR_OPS",
    "NOTIFY_DOWN_STATUS",
    "NOTIFY_DAILY_HAUL_REPORT",
    "NOTIFY_MATERIAL_TRACKING_REPORT",
    "OPS_EMAIL_ENABLED",
    "API_DATA_DUMP_ENABLED",
    "API_DATA_AUTH_ENABLED",
    "API_DATA_AUTH_KEY",
    "UTILIZATION_REPORT_ENABLED",
    "SESSION_SCRIPT_ENABLED",
    "TASK_PROGRESS_SCRIPT_ENABLED",
    "CONSUMABLES_SCRIPT_ENABLED",
    "WORKPLACE_INSPECTION_SCRIPT_ENABLED",
    "EQUIPMENT_INSPECTION_SCRIPT_ENABLED",
    "DAILY_SHIFT_LOG_REPORT_ENABLED",
    "DAILY_PRODUCTION_REPORT_ENABLED",
    "WEEKLY_REPORT_ENABLED",
    "DAILY_LOG_REPORT_ENABLED",
    "MONITORING_ENABLED",
    "APNS_TOPIC_SUPERVISOR",
    "APNS_TOPIC_OPERATOR",
    "APNS_PASSPHRASE_SUPERVISOR",
    "APNS_PASSPHRASE_OPERATOR",
    "APNS_PASSPHRASE_GEOLOGIST",
    "APNS_PASSPHRASE_TECHNICIAN",
    "APNS_PASSPHRASE_SHIFTER",
    "KUE_UI_USERNAME",
    "KUE_UI_PASSWORD",
    "KUE_SERVICE_PREFIX",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_ENABLED",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_TYPE",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_PROJECT_ID",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_PRIVATE_KEY_ID",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_PRIVATE_KEY",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_CLIENT_EMAIL",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_CLIENT_ID",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_AUTH_URI",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_TOKEN_URI",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_AUTH_PROVIDER_X509_CERT_URL",
    "FIREBASE_PUSH_NOTIFICATIONS_ANDROID_CLIENT_X509_CERT_URL",
  ]);*/
  const tria = obtain();
  console.log(tria);
  sampleJson = [];
  if (d1.json === "") {
    console.log("empty json condition");
    // res.send("empty");
    res.json(sampleJson);
  } else {
    console.log(d1.json);
    res.send();
  }
});

router.post("/postJson", (req, res) => {
  console.log(req.body);
  serverTemplate.findOne(
    { _id: d1._id },
    "key name user host ref repo path pre_deploy_local pre_deploy post_deploy pre_setup post_setup json",
    function (err, reset) {
      if (err) throw err;
      else {
        console.log(req.body);
        reset.json = req.body;
        console.log(reset);
        reset.save().then((data) => {
          res.json(data);
          // console.log('-----data got after saving----')
          // console.log(typeof(data))

          fs.writeFile(
            `../backend/syncJsons/${data.name}/data.json`,
            JSON.stringify(data.json),
            (err) => {
              if (err) {
                console.log("error got after save", err);
              } else {
                console.log("successfully file created");
              }
            }
          );
        });
      }
    }
  );
});

module.exports = router;
