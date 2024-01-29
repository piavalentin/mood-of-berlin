const { firestore } = require("./firebase");
const moment = require("moment-timezone");
require("dotenv").config();

const uploadColor = async ({ color, name, rgb }) => {
  const berlinTime = moment.tz("Europe/Berlin").format();

  const data = {
    rgb: rgb,
    name: name,
    color: color,
    time: berlinTime,
    location: "Berlin",
    year: moment().year(),
    month: moment().month(),
  };

  firestore
    .collection(process.env.DB_PATH || "")
    .doc(berlinTime)
    .set(data)
    .then((docRef) => {
      console.log("Color uploaded for", berlinTime);
    })
    .catch((error) => {
      console.error("Error uploading color: ", error);
    });
};

exports.uploadColor = uploadColor;
